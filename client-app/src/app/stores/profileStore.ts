import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { BioValue, Profile } from "../models/profile";
import { router } from "../route/Routes";
import { store } from "./store";
import { Photos } from "../models/photos";
import { Article } from "../models/article";

export default class ProfileStore {
    profileData: Profile | undefined
    loading: boolean = true
    uploadingPhoto: boolean = false;
    newPhoto: Photos | undefined
    setMainLoading: boolean = false;
    deleteLoading: boolean = false;
    followingLoading: boolean = false;
    lstFollowingLoading: boolean = false;
    lstArticlesLoading: boolean = false;
    FollowProfiles: Profile[] = [];
    lstArticles: Article[] = [];
    acvtiveTab = 0;
    activeTitles: string = "";
    bioloading = false;

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.acvtiveTab,
            acvtiveTab => {
                if (acvtiveTab === 1 || acvtiveTab === 2) {
                    const type = acvtiveTab === 1 ? "followers" : "following";
                    this.ListFollowing(type);
                    this.activeTitles = type;
                }
                else {
                    this.FollowProfiles = [];
                }
            }
        )
    }

    setActiveTab = (activeTab: number) => {
        this.acvtiveTab = activeTab;
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

    UpdateFollowing = async (userName: string, following: boolean) => {
        this.followingLoading = true;
        try {
            await agent.profile.UpdateFollowing(userName);
            runInAction(() => {
                if (this.profileData && this.profileData.userName
                    !== store.accountstore.currentUser?.userName && this.profileData.userName === userName) {
                    following ? this.profileData.followers! -- : this.profileData.followers! ++;
                    this.profileData.following = !this.profileData.following;
                }
                if (this.profileData && this.profileData.userName === store.accountstore.currentUser?.userName) {
                    following ? this.profileData.followings! -- : this.profileData.followings! ++;
                }
                this.FollowProfiles.forEach((profile) => {
                    if (profile.userName === userName) {
                        profile.following ? profile.followers! -- : profile.followers! ++;
                        profile.following = !profile.following;
                    }
                })
                this.followingLoading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.followingLoading = false
            });
        }
    }

    ListFollowing = async (type: string) => {
        this.lstFollowingLoading = true;
        this.FollowProfiles = [];
        try {
            var profiles = await agent.profile.listFollowing(this.profileData?.userName!, type);
            runInAction(() => {
                this.FollowProfiles = profiles;
                this.lstFollowingLoading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.lstFollowingLoading = false;
            })
        }
    }

    ListArticles = async (username: string) => {
        this.lstArticlesLoading = true;
        this.lstArticles = [];
        try {
            var articles = await agent.profile.listArticles(username);
            runInAction(() => {
                this.lstArticles = articles;
                this.lstArticlesLoading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.lstArticlesLoading = false;
            })
        }
    }

    EditBio = async (bioValue: BioValue) => {
        this.bioloading = true;
        try {
            await agent.profile.editBio(bioValue);
            runInAction(() => {
                if (this.profileData)
                    this.profileData.bio = bioValue.bio;
                this.bioloading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.bioloading = false;
            })
        }
    }
}