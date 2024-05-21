
import { v4 as uuid } from 'uuid';

export const CompanyDashboardMenu = [

	{
		id: uuid(),
		title: 'menu',
		grouptitle: true
	},

	{
		id: uuid(),
		title: 'Admin user',
		icon: 'users',
		link: '/adminusers'
	},

	{
		id: uuid(),
		title: 'Employee',
		icon: 'users',
		link: '/companyemployee'
	},

	{
		id: uuid(),
		title: 'Reports',
		icon: 'users',
		link: '/companyemployeereports'
	},



];

export default CompanyDashboardMenu;
