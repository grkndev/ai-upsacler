import Header from "@/components/ui/header";
import TabBarComponent from "@/components/ui/tabbar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBarComponent {...props} />}
      screenOptions={{ 
        header: (props) => <Header {...props} />,
        animation: "shift",
        sceneStyle: { backgroundColor: "#0C081E" },
      }}
    />
  );
}
