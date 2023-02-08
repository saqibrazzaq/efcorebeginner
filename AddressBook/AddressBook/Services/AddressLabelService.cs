using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class AddressLabelService : IAddressLabelService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IContactAddressService _contactAddressService;
        public AddressLabelService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IContactAddressService contactAddressService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _contactAddressService = contactAddressService;
        }

        public AddressLabelRes Create(AddressLabelReqEdit dto)
        {
            var entity = _mapper.Map<AddressLabel>(dto);
            _repositoryManager.AddressLabelRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<AddressLabelRes>(entity);
        }

        public void Delete(int addressLabelId)
        {
            ValidateForDelete(addressLabelId);

            var entity = FindAddressLabelIfExists(addressLabelId, true);
            _repositoryManager.AddressLabelRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private void ValidateForDelete(int addressLabelId)
        {
            if (_contactAddressService.AnyAddress(addressLabelId))
            {
                throw new Exception("Cannot delete Address Label. It is used in Addresses.");
            }
        }

        private AddressLabel FindAddressLabelIfExists(int addressLabelId, bool trackChanges)
        {
            var entity = _repositoryManager.AddressLabelRepository.FindByCondition(
                x => x.AddressLabelId == addressLabelId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No address label found with id " + addressLabelId); }
            return entity;
        }

        public AddressLabelRes Get(int addressLabelId)
        {
            var entity = FindAddressLabelIfExists(addressLabelId, false);
            return _mapper.Map<AddressLabelRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<AddressLabelRes>, MetaData> Search(AddressLabelReqSearch dto)
        {
            var pagedEntities = _repositoryManager.AddressLabelRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<AddressLabelRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<AddressLabelRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public AddressLabelRes Update(int addressLabelId, AddressLabelReqEdit dto)
        {
            var entity = FindAddressLabelIfExists(addressLabelId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<AddressLabelRes>(entity);
        }
    }
}
