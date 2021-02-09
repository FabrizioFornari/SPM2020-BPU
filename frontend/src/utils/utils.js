export const IsUsersAccessPermit = (roles) => {
    return roles.includes(1) || roles.includes(2)
}

export const IsReservationsAccessPermit = (roles) => {
    return roles.includes(1) || roles.includes(2) || roles.includes(3) || roles.includes(4)
}

export const IsAccessPermit = (roles) => {
    return roles.includes(1) || roles.includes(2) || roles.includes(3) || roles.includes(4)
}
