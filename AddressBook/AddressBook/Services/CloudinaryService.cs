using AddressBook.Common;
using AddressBook.Dtos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace AddressBook.Services
{
    public class CloudinaryService
    {
        private readonly IConfiguration _configuration;
        public CloudinaryService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void DeleteImage(string? cloudinaryId)
        {
            Cloudinary cloudinary = new Cloudinary(CloudinaryUrl);
            if (string.IsNullOrWhiteSpace(cloudinaryId) == false)
            {
                try
                {
                    cloudinary.Destroy(new DeletionParams(cloudinaryId));
                }
                catch (Exception)
                {

                }
            }
        }

        public string? CloudinaryUrl { get { return SecretUtility.CloudinaryUrl; } }

        public CloudinaryUploadResultRes UploadProfilePictureThumbnail(IFormFile file,
            string tempFolderPath)
        {
            var imagePath = saveNewFileInTempFolder(file, tempFolderPath);
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imagePath),
                Folder = CloudinaryFolders.Profile,
                EagerTransforms = new List<Transformation>()
                {
                    new EagerTransformation().Width(200).Height(200).Gravity("faces").Crop("thumb")
                }
            };
            Cloudinary cloudinary = new Cloudinary(CloudinaryUrl);
            var result = cloudinary.Upload(uploadParams);

            File.Delete(imagePath);

            return new CloudinaryUploadResultRes
            {
                PublicId = result.PublicId,
                SecureUrl = result.Eager[0].SecureUrl.ToString()
            };
        }

        public CloudinaryUploadResultRes UploadCategoryImage(IFormFile file, string tempFolderPath)
        {
            var imagePath = saveNewFileInTempFolder(file, tempFolderPath);
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imagePath),
                Folder = CloudinaryFolders.General
            };
            Cloudinary cloudinary = new Cloudinary(CloudinaryUrl);
            var result = cloudinary.Upload(uploadParams);

            File.Delete(imagePath);

            return new CloudinaryUploadResultRes
            {
                PublicId = result.PublicId,
                SecureUrl = result.SecureUrl.ToString()
            };
        }

        private string saveNewFileInTempFolder(IFormFile file, string pathToSave)
        {
            if (Directory.Exists(pathToSave) == false)
            {
                Directory.CreateDirectory(pathToSave);
            }

            if (file.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + "." + Path.GetExtension(file.FileName);
                var fullPath = Path.Combine(pathToSave, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return fullPath;
            }

            throw new Exception("Could not save profile picture");
        }
    }
}
