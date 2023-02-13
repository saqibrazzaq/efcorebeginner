using AddressBook.Common;
using AddressBook.Dtos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace AddressBook.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        public CloudinaryService()
        {
            
        }

        public void DeleteImage(string? cloudinaryId)
        {
            Cloudinary cloudinary = new Cloudinary(new Account(
                CloudName, APIKey, APISecret));
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

        private string? CloudName { get { return SecretUtility.Cloudinary_Cloud_Name; } }
        private string? APIKey { get { return SecretUtility.Cloudinary_API_Key; } }
        private string? APISecret { get { return SecretUtility.Cloudinary_API_Secret; } }

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
            Cloudinary cloudinary = new Cloudinary(new Account(
                CloudName, APIKey, APISecret));
            var result = cloudinary.Upload(uploadParams);

            File.Delete(imagePath);

            return new CloudinaryUploadResultRes
            {
                PublicId = result.PublicId,
                SecureUrl = result.Eager[0].SecureUrl.ToString()
            };
        }

        public CloudinaryUploadResultRes UploadGeneralImage(IFormFile file, string tempFolderPath)
        {
            var imagePath = saveNewFileInTempFolder(file, tempFolderPath);
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imagePath),
                Folder = CloudinaryFolders.General
            };
            Cloudinary cloudinary = new Cloudinary(new Account(
                CloudName, APIKey, APISecret));
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
