using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface ICloudinaryService
    {
        CloudinaryUploadResultRes UploadProfilePictureThumbnail(IFormFile file, string tempFolderPath);
        CloudinaryUploadResultRes UploadCategoryImage(IFormFile file, string tempFolderPath);
        CloudinaryUploadResultRes UploadProductImage(IFormFile file, string tempFolderPath);
        void DeleteImage(string? cloudinaryId);
    }
}
