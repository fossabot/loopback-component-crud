import {
    Entity,
    model,
    property,
    belongsTo,
    hasOne,
    hasMany,
} from "@loopback/repository";

import { ControllerScope } from "../../src";

@model()
export class User extends Entity {
    @property()
    id: string;

    @property()
    username: string;

    @property()
    password: string;

    @hasOne(() => Profile)
    profile: any;

    @belongsTo(() => User)
    parentId: string;

    @hasMany(() => Role)
    roles: any[];
}

@model()
class Profile extends Entity {
    @property()
    id: string;

    @property()
    name: string;

    @property()
    date: Date;

    @belongsTo(() => Profile)
    parentId: any;
}

@model()
class Role extends Entity {
    @property()
    id: string;

    @property()
    name: string;

    @hasOne(() => Profile)
    profile: any;

    @belongsTo(() => Role)
    parentId: string;

    @hasMany(() => Permission)
    permissions: any[];
}

@model()
class Permission extends Entity {
    @property()
    id: string;

    @property()
    key: string;
}

export const UsersScope: ControllerScope<any, any, any, any> = {
    modelMapper: async (context, models) => models,
    repositoryGetter: (controller) => undefined as any,

    create: {
        authentication: { strategy: "jwt" },
        authorization: { scopes: ["CREATE_USER"], allowedRoles: ["X"] },
    },
    read: { authentication: { strategy: "jwt" }, authorization: {} },
    update: {
        authentication: { strategy: "jwt" },
        authorization: { scopes: ["UPDATE_USER"] },
    },
    delete: {
        authentication: { strategy: "jwt" },
        authorization: { scopes: ["DELETE_USER"] },
    },

    include: {
        parent: {
            modelMapper: async (context, models) => models,
            repositoryGetter: (controller) => undefined as any,

            create: {
                authentication: { strategy: "jwt" },
                authorization: {
                    scopes: ["CREATE_PARENT"],
                    allowedRoles: ["Y"],
                    deniedRoles: ["YPrime"],
                },
            },
            read: {
                authentication: { strategy: "jwt" },
                authorization: { scopes: ["READ_PARENT"] },
            },
            update: {
                authentication: { strategy: "jwt" },
                authorization: { scopes: ["UPDATE_PARENT"] },
            },
            delete: {
                authentication: { strategy: "jwt" },
                authorization: { scopes: ["DELETE_PARENT"] },
            },

            include: {},
        },
        profile: {
            modelMapper: async (context, models) => models,
            repositoryGetter: (controller) => undefined as any,

            create: {
                authentication: { strategy: "jwt" },
                authorization: {
                    scopes: ["CREATE_PROFILE"],
                    allowedRoles: ["Z"],
                },
            },
            read: {
                authentication: { strategy: "jwt" },
                authorization: { scopes: ["READ_PROFILE"] },
            },
            update: {
                authentication: { strategy: "jwt" },
                authorization: { scopes: ["UPDATE_PROFILE"] },
            },
            delete: {
                authentication: { strategy: "jwt" },
                authorization: { scopes: ["DELETE_PROFILE"] },
            },

            include: {},
        },
        roles: {
            modelMapper: async (context, models) => models,
            repositoryGetter: (controller) => undefined as any,

            create: {
                authentication: { strategy: "jwt" },
                authorization: {},
            },
            read: {
                authentication: { strategy: "jwt" },
                authorization: { scopes: ["READ_ROLES"] },
            },
            update: {
                authentication: { strategy: "jwt" },
                authorization: { scopes: ["UPDATE_ROLES"] },
            },
            delete: {
                authentication: { strategy: "jwt" },
                authorization: { scopes: ["DELETE_ROLES"] },
            },

            include: {
                parent: {
                    modelMapper: async (context, models) => models,
                    repositoryGetter: (controller) => undefined as any,

                    create: {
                        authentication: { strategy: "jwt" },
                        authorization: {
                            scopes: ["CREATE_ROLE_PARENT"],
                            allowedRoles: ["T"],
                        },
                    },
                    read: {
                        authentication: { strategy: "jwt" },
                        authorization: { scopes: ["READ_ROLE_PARENT"] },
                    },
                    update: {
                        authentication: { strategy: "jwt" },
                        authorization: { scopes: ["UPDATE_ROLE_PARENT"] },
                    },
                    delete: {
                        authentication: { strategy: "jwt" },
                        authorization: { scopes: ["DELETE_ROLE_PARENT"] },
                    },

                    include: {},
                },
                permissions: {
                    modelMapper: async (context, models) => models,
                    repositoryGetter: (controller) => undefined as any,

                    create: {
                        authentication: { strategy: "jwt" },
                        authorization: {
                            scopes: ["CREATE_ROLE_PERMISSION"],
                            deniedRoles: ["PPrime"],
                        },
                    },
                    read: {
                        authentication: { strategy: "jwt" },
                        authorization: { scopes: ["READ_ROLE_PERMISSION"] },
                    },
                    update: {
                        authentication: { strategy: "jwt" },
                        authorization: { scopes: ["UPDATE_ROLE_PERMISSION"] },
                    },
                    delete: {
                        authentication: { strategy: "jwt" },
                        authorization: { scopes: ["DELETE_ROLE_PERMISSION"] },
                    },

                    include: {},
                },
            },
        },
    },
};
