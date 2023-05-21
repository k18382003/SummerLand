using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        // 1. At least a number 2. At least one lowercase 3. At least one uppercase 4. Between 4 - 8 charators long
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password doesn't meet the rules")]
        public string Password { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string UserName { get; set; }
    }
}
