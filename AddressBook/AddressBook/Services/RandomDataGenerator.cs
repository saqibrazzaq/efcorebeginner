using AddressBook.Entities;
using AddressBook.Repository;
using Bogus;

namespace AddressBook.Services
{
    public class RandomDataGenerator : IRandomDataGenerator
    {
        private readonly IRepositoryManager _repositoryManager;

        public RandomDataGenerator(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }

        public IEnumerable<Contact> GenerateContacts(int number)
        {
            var labelIds = _repositoryManager.LabelRepository.FindAll(false)
                .Select(x => x.LabelId).ToList();
            var phoneLabelIds = _repositoryManager.PhoneLabelRepository.FindAll(false)
                .Select(x => x.PhoneLabelId).ToList();
            var emailLabelIds = _repositoryManager.EmailLabelRepository.FindAll(false)
                .Select(x => x.EmailLabelId).ToList();
            var websiteLabelIds = _repositoryManager.WebsiteLabelRepository.FindAll(false)
                .Select(x => x.WebsiteLabelId).ToList();
            var addressLabelIds = _repositoryManager.AddressLabelRepository.FindAll(false)
                .Select(x => x.AddressLabelId).ToList();
            var chatLabelIds = _repositoryManager.ChatLabelRepository.FindAll(false)
                .Select(x => x.ChatLabelId).ToList();
            var cityIds = _repositoryManager.CityRepository.FindAll(false)
                .Select(x => x.CityId).ToList();

            var contactGen = new Faker<Contact>()
                .RuleFor(x => x.FirstName, b => b.Name.FirstName())
                .RuleFor(x => x.MiddleName, "")
                .RuleFor(x => x.LastName, b => b.Name.LastName())
                .RuleFor(x => x.Company, b => b.Company.CompanyName())
                .RuleFor(x => x.Department, b => b.Name.JobArea())
                .RuleFor(x => x.JobTitle, b => b.Name.JobTitle())
                .RuleFor(x => x.DateOfBirth, b => b.Date.Past(10))
                .RuleFor(x => x.PictureUrl, "")
                .RuleFor(x => x.Notes, "")
                .RuleFor(x => x.CloudinaryId, "")
                .RuleFor(x => x.ContactPhones, b => new List<ContactPhone>() { new ContactPhone()
                {
                    Phone = b.Phone.PhoneNumber(),
                    PhoneLabelId = phoneLabelIds.Any() ? b.PickRandom(phoneLabelIds) : null
                } })
                .RuleFor(x => x.ContactEmails, b => new List<ContactEmail>() { new ContactEmail()
                {
                    Email = b.Name.FirstName() + "." + b.Name.LastName() + "@gmail.com",
                    EmailLabelId = emailLabelIds.Any() ? b.PickRandom(emailLabelIds) : null
                }
                })
                .RuleFor(x => x.ContactChats, b => new List<ContactChat>() { new ContactChat()
                {
                    Chat = b.Name.FirstName(),
                    ChatLabelId = chatLabelIds.Any() ? b.PickRandom(chatLabelIds) : null
                }
                })
                .RuleFor(x => x.ContactWebsites, b => new List<ContactWebsite>() { new ContactWebsite()
                {
                    Website = b.Name.FullName() + ".com",
                    WebsiteLabelId = websiteLabelIds.Any() ? b.PickRandom(websiteLabelIds) : null
                }
                })
                .RuleFor(x => x.ContactAddresses, b => new List<ContactAddress>() { new ContactAddress()
                {
                    Line1 = b.Address.StreetAddress(),
                    CityId = cityIds.Any() ? b.PickRandom(cityIds) : null,
                    AddressLabelId = addressLabelIds.Any() ? b.PickRandom(addressLabelIds) : null
                }
                })
                .RuleFor(x => x.ContactLabels, b => new List<ContactLabel>() 
                { 
                    new ContactLabel() { LabelId = b.PickRandom(labelIds)} 
                });
            var contacts = contactGen.Generate(number);
            return contacts;
        }

        private IEnumerable<ContactLabel> GetContactLabels(List<int> labelIds)
        {
            var labelGen = new Faker<ContactLabel>();
            if (labelIds.Any()) { labelGen.RuleFor(x => x.LabelId, b => b.PickRandom(labelIds)); }
            var labels = labelGen.Generate(1);
            return labels;
        }

        private IEnumerable<ContactAddress> GetContactAddresses(IEnumerable<int> addressLabelIds,
            IEnumerable<int> cityIds)
        {
            var addressGen = new Faker<ContactAddress>()
                .RuleFor(x => x.Line1, b => b.Address.StreetAddress());
            if (cityIds.Any()) { addressGen.RuleFor(x => x.CityId, b => b.PickRandom(cityIds)); }
            if (addressLabelIds.Any()) { addressGen.RuleFor(x => x.AddressLabelId, b => b.PickRandom(addressLabelIds)); }
            var addresses = addressGen.Generate(1);
            return addresses;
        }

        private IEnumerable<ContactWebsite> GetContactWebsites(Contact c, IEnumerable<int> websiteLabelIds)
        {
            var websiteGen = new Faker<ContactWebsite>()
                .RuleFor(x => x.Website, b => c.FirstName + "." + c.LastName + ".com");
            if (websiteLabelIds.Any()) { websiteGen.RuleFor(x => x.WebsiteLabelId, b => b.PickRandom(websiteLabelIds)); }
            var websites = websiteGen.Generate(1);
            return websites;
        }

        private IEnumerable<ContactChat> GetContactChats(Contact c, IEnumerable<int> chatLabelIds)
        {
            var chatGen = new Faker<ContactChat>()
                .RuleFor(x => x.Chat, b => c.FirstName + "." + c.LastName);
            if (chatLabelIds.Any()) { chatGen.RuleFor(x => x.ChatLabelId, b => b.PickRandom(chatLabelIds)); }
            var chats = chatGen.Generate(1);
            return chats;
        }

        private IEnumerable<ContactEmail> GetContactEmails(Contact c, IEnumerable<int> emailLabelIds)
        {
            var emailGen = new Faker<ContactEmail>()
                .RuleFor(x => x.Email, b => c.FirstName + "." + c.LastName + "@gmail.com");
            if (emailLabelIds.Any()) { emailGen.RuleFor(x => x.EmailLabelId, b => b.PickRandom(emailLabelIds)); }
            var emails = emailGen.Generate(1);
            return emails;
        }

        private IEnumerable<ContactPhone> GetContactPhones(IEnumerable<int> phoneLabelIds)
        {
            var phoneGen = new Faker<ContactPhone>()
                .RuleFor(x => x.Phone, b => b.Phone.PhoneNumber());
            if (phoneLabelIds.Any()) { phoneGen.RuleFor(x => x.PhoneLabelId, b => b.PickRandom(phoneLabelIds)); }
            var phones = phoneGen.Generate(1);
            return phones;
        }

        public IEnumerable<Label> GenerateLabels()
        {
            return new List<Label>() 
            { 
                new Label() { Name = "Home" },
                new Label() { Name = "Work" },
                new Label() { Name = "Friends" },
                new Label() { Name = "Family" },
            };
        }

        public IEnumerable<EmailLabel> GenerateEmailLabels()
        {
            return new List<EmailLabel>()
            {
                new EmailLabel() { Label = "Home" },
                new EmailLabel() { Label = "Work" },
                new EmailLabel() { Label = "Other" },
            };
        }

        public IEnumerable<PhoneLabel> GeneratePhoneLabels()
        {
            return new List<PhoneLabel>()
            {
                new PhoneLabel() { Label = "Home" },
                new PhoneLabel() { Label = "Work" },
                new PhoneLabel() { Label = "Other" },
                new PhoneLabel() { Label = "Mobile" },
                new PhoneLabel() { Label = "Main" },
            };
        }

        public IEnumerable<AddressLabel> GenerateAddressLabels()
        {
            return new List<AddressLabel>()
            {
                new AddressLabel() { Label = "Home" },
                new AddressLabel() { Label = "Work" },
                new AddressLabel() { Label = "Other" },
            };
        }

        public IEnumerable<WebsiteLabel> GenerateWebsiteLabels()
        {
            return new List<WebsiteLabel>()
            {
                new WebsiteLabel() { Label = "Profile" },
                new WebsiteLabel() { Label = "Blog" },
                new WebsiteLabel() { Label = "Homepage" },
                new WebsiteLabel() { Label = "Work" },
            };
        }

        public IEnumerable<ChatLabel> GenerateChatLabels()
        {
            return new List<ChatLabel>()
            {
                new ChatLabel() { Label = "Google Talk" },
                new ChatLabel() { Label = "AIM" },
                new ChatLabel() { Label = "Yahoo" },
                new ChatLabel() { Label = "Skype" },
                new ChatLabel() { Label = "MSN" },
                new ChatLabel() { Label = "ICQ" },
                new ChatLabel() { Label = "Jabber" },
            };
        }
    }
}
