using AddressBook.Dtos;
using Microsoft.AspNetCore.Http;

namespace AddressBook.Services
{
    public interface ICloudinaryService
    {
        CloudinaryUploadResultRes UploadProfilePictureThumbnail(IFormFile file, string tempFolderPath);
        CloudinaryUploadResultRes UploadGeneralImage(IFormFile file, string tempFolderPath);
        void DeleteImage(string? cloudinaryId);
    }
}
