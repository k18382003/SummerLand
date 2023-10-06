using System.Net.Mail;

namespace API.Services
{
    public class EmailService
    {
        private readonly IConfiguration _Configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _Configuration = configuration;
            _logger = logger;
        }

        public bool SendEmail(string email, string confrimLink)
        {
            var emailSetting = _Configuration.GetSection("EmailSetting");
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(emailSetting["Account"]);
            mailMessage.To.Add(new MailAddress(email));

            mailMessage.Subject = "Email Confirmation required by Summer Tech Land";
            mailMessage.Body = "Please click to confirm your Email: " + confrimLink;

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new System.Net.NetworkCredential(emailSetting["Account"], emailSetting["Password"]);

            try
            {
                smtpClient.Send(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                // log exception
                _logger.LogError(ex, ex.Message);
                return false;
            }

        }
    }
}
