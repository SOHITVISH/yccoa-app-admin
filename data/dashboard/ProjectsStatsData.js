import {
   Briefcase,
   ListTask,
   People,
   Bullseye
} from 'react-bootstrap-icons';

export const ProjectsStats = [
   {
      id: 1,
      title: "Company",
      value: 2,
      icon: <Briefcase size={18} style={{color:"green"}}/>,
      statInfo: '<span className="text-dark me-2">2</span> Completed'
   },
   {
      id: 2,
      title: "Active Company",
      value: 1,
      icon: <ListTask size={18} style={{color:"green"}} />,
      statInfo: '<span className="text-dark me-2">28</span> Completed'
   },
   {
      id: 3,
      title: "Employee",
      value: 12,
      icon: <People size={18} style={{color:"green"}} />,
      statInfo: '<span className="text-dark me-2">1</span> Completed'
   },
   {
      id: 4,
      title: "Productivity",
      value: '76%',
      icon: <Bullseye size={18} style={{color:"green"}} />,
      statInfo: '<span className="text-dark me-2">5%</span> Completed'
   }
];
export default ProjectsStats;
