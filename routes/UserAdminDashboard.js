
import { v4 as uuid } from 'uuid';

export const UserAdminDashboard = [

    {
        id: uuid(),
        title: 'menu',
        grouptitle: true
    },

    {
        id: uuid(),
        title: 'Employee',
        icon: 'users',
        link: '/employee'
    },
    {
        id: uuid(),
        title: 'Reports',
        icon: "home",
        link: '/reports'
    },


];

export default UserAdminDashboard;
