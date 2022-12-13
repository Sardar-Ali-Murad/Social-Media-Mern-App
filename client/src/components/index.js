import Landing from "./Landing";
import React from "react";

// import Error from "./Error";
// import ProtectedRoute from "./ProtectedRoute";
// import Home from "./Home";
// import CreatePin from "./CreatePin";
// import PinDetails from "./PinDetails";
// import UserPins from "./UserPins";
// import CategoryPins from "./CategoryPins";
// import CurrentUserPins from "./CurrentUserPins";

const Error=React.lazy(()=>import("./Error"))
const ProtectedRoute=React.lazy(()=>import("./ProtectedRoute"))
const Home=React.lazy(()=>import("./Home"))
const CreatePin=React.lazy(()=>import("./CreatePin"))
const PinDetails=React.lazy(()=>import("./PinDetails"))
const UserPins=React.lazy(()=>import("./UserPins"))
const CategoryPins=React.lazy(()=>import("./CategoryPins"))
const CurrentUserPins=React.lazy(()=>import("./CurrentUserPins"))

export {Landing,Error,ProtectedRoute,Home,CreatePin,PinDetails,UserPins,CategoryPins,CurrentUserPins}