import { withNavigationWatcher } from "./contexts/navigation";
import {
	HomePage,
	DisplayDataPage,
	ProfilePage,
	CustomisedComponentsPage,
	TextBoxV2Page
} from "./pages";

const routes = [
	{
		path: "/display-data",
		component: DisplayDataPage
	},
	{
		path: "/profile",
		component: ProfilePage
	},
	{
		path: "/home",
		component: HomePage
	},
	{
		path: "/customised-components",
		component: CustomisedComponentsPage
	},
	{
		path: "/text-box-v2",
		component: TextBoxV2Page
	}
];

export default routes.map(route => {
	return {
		...route,
		component: withNavigationWatcher(route.component)
	};
});
