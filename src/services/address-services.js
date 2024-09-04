import { prismaClient } from "../application/database";
import { validate } from "../validations/validation";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validations/address-validation";
import { ResponseError } from "../error/response-error";
import { getContactValidation } from "../validations/contact-validation";


const contactExistence = async(user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const contact = await prismaClient.contact.count({
        where: {
            id: contactId,
            username: user.username
        }
    });

    if(!contact){
        throw new ResponseError(404, "contact is not found");
    }

    return contactId;
};


const create = async(user, contactId, request) => {
    contactId = await contactExistence(user, contactId);

    const address = validate(createAddressValidation, request);
    address.contact_id = contactId;

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });
};

const get = async(user, contactId, addressId) => {
    contactId = await contactExistence(user, contactId);
    addressId = validate(getAddressValidation, addressId);

    const address = await prismaClient.address.findFirst({
        where: {
            id: addressId,
            contact_id: contactId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });

    if(!address) {
        throw new ResponseError(404, "address is not found");
    }

    return address;
};

const update = async(user, contactId, request) => {
    contactId = await contactExistence(user, contactId);
    const address = validate(updateAddressValidation, request);

    const addressCount = await prismaClient.address.count({
        where: {
            id: address.id,
            contact_id: contactId
        }
    });

    if(addressCount !== 1) {
        throw new ResponseError(404, "address is not found");
    }

    return prismaClient.address.update({
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code,
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });
};

const remove = async(user, contactId, addressId) => {
    contactId = await contactExistence(user, contactId);
    addressId = validate(getAddressValidation, addressId);

    const addressCount = await prismaClient.address.count({
        where: {
            id: addressId,
            contact_id: contactId
        }
    });

    if(addressCount !== 1) {
        throw new ResponseError(404, "address is not found");
    }

    await prismaClient.address.delete({
        where: {
            id: addressId
        }
    });
};

export default {
    create,
    get,
    update,
    remove
};