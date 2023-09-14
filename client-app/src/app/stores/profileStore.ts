import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { router } from "../route/Routes";
import { store } from "./store";
import { Photos } from "../models/photos";

export default class ProfileStore {
    profileData: Profile | undefined
    loading: boolean = true
    uploadingPhoto: boolean = false;
    newPhoto: Photos | undefined
    setMainLoading: boolean = false;
    deleteLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.accountstore.currentUser && this.profileData) {
            return store.accountstore.currentUser.userName === this.profileData?.userName
        }
        return false;
    }

    GetProfile = async (username: string) => {
        try {
            var profile = await agent.profile.GetProfile(username);
            runInAction(() => {
                this.profileData = profile
                this.loading = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                router.navigate('/not-found');
            })
        }
    }

    UploadPhoto = async (file: Blob) => {
        try {
            this.uploadingPhoto = true;
            var response = await agent.profile.UploadPhoto(file);
            runInAction(() => {
                this.newPhoto = {
                    photoId: response.data.name,
                    url: response.data.uri,
                    isMain: response.data.isMain
                }
                if (this.profileData) {
                    this.profileData.photos?.push(this.newPhoto);
                    if (store.accountstore.currentUser && this.newPhoto.isMain) {
                        store.accountstore.setImage(response.data.uri);
                        this.profileData.image = response.data.uri;
                    }
                }
                this.uploadingPhoto = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.uploadingPhoto = false;
            })

        }
    }

    setMain = async (photo: Photos) => {
        this.setMainLoading = true;
        try {
            await agent.profile.setMain(photo.photoId);
            store.accountstore.setImage(photo.url);
            runInAction(() => {
                if (this.profileData && this.profileData.photos) {
                    this.profileData.photos.find(x => x.isMain)!.isMain = false;
                    this.profileData.photos.find(x => x.photoId === photo.photoId)!.isMain = true;
                    this.profileData.image = photo.url;
                }
                this.setMainLoading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.setMainLoading = false;
            })
        }
    }

    DeletePhoto = async (photo: Photos) => {
        this.deleteLoading = true;
        try {
            await agent.profile.deletePhoto(photo.photoId);
            runInAction(() => {
                if (this.profileData && this.profileData.photos) {
                    this.profileData.photos = this.profileData.photos.filter(
                        x => x.photoId !== photo.photoId)
                }
                this.deleteLoading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.deleteLoading = false;
            })
        }
    }
}