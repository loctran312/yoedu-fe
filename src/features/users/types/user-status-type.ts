export const USER_STATUS = {
    ACTIVE: 'ACTIVE',

    INACTIVE: 'INACTIVE',

    DELETE: 'DELETED',
} as const;

export type UserStatusType = (typeof USER_STATUS)[keyof typeof USER_STATUS];