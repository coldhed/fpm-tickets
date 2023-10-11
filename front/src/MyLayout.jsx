import { Layout } from 'react-admin';

import { MyMenu } from './MyMenu';

export const MyLayout = props => 
<div> 

<Layout {...props} menu={MyMenu} />;

</div>    

