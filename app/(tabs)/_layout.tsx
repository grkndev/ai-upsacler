import TabBarComponent from "@/components/ui/tabbar";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        tabBar={(props) => <TabBarComponent {...props} />}
        screenOptions={{
         // header: (props) => <Header {...props} />,
         headerShown: false,
          animation: "shift",
          sceneStyle: { backgroundColor: "#0C081E" },
        }}
      />
    </>
  );
}
