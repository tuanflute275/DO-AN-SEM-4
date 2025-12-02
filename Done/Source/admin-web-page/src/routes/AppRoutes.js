import UserMasterLayout from "../components/layouts/UserMasterLayout";
import AddActor from "../components/pages/actor/AddActor";
import ListActor from "../components/pages/actor/ListActor";
import UpdateActor from "../components/pages/actor/UpdateActor";
import AddComic from "../components/pages/comic/AddComic";
import ComicDetails from "../components/pages/comic/ComicDetails";
import ListComic from "../components/pages/comic/ListComic";
import UpdateComic from "../components/pages/comic/UpdateComic";
import AddDirector from "../components/pages/director/AddDirector";
import ListDirector from "../components/pages/director/ListDirector";
import UpdateDirector from "../components/pages/director/UpdateDirector";
import AddEpisode from "../components/pages/episode/AddEpisode";
import ShowListComic from "../components/pages/episode/ShowListComic";
import AddGenre from "../components/pages/genre/AddGenre";
import ListGenre from "../components/pages/genre/ListGenre";
import UpdateGenre from "../components/pages/genre/UpdateGenre";
import HomePage from "../components/pages/home/HomePage";
import AddImage from "../components/pages/images/AddImage";
import ListChapterImage from "../components/pages/images/ListChapterImage";
import UpdateImage from "../components/pages/images/UpdateImage";
import LoginPage from "../components/pages/LoginPage";
import ListReview from "../components/pages/reviews/ListReview";
import ListReviewComic from "../components/pages/reviews/ListReviewComic";
import AddUser from "../components/pages/user/AddUser";
import ListUser from "../components/pages/user/ListUser";
import UpdateUser from "../components/pages/user/UpdateUser";
import ListEpisode from './../components/pages/episode/ListEpisode';
import UpdateEpisode from './../components/pages/episode/UpdateEpisode';

export const unloginRoutes = [
    {
        path: "/",
        element: <LoginPage />
    },
]

export const clientRoutes = [
    {
        path: "/",
        element: <UserMasterLayout child={<HomePage />} />
    },
    // Genre routes
    {
        path: "/genre",
        element: <UserMasterLayout child={<ListGenre />} />
    },
    {
        path: "/genre/add",
        element: <UserMasterLayout child={<AddGenre />} />
    },
    {
        path: "/genre/edit/:id",
        element: <UserMasterLayout child={<UpdateGenre />} />
    },

    // Actor routes
    {
        path: "/actor",
        element: <UserMasterLayout child={<ListActor />} />
    },
    {
        path: "/actor/add",
        element: <UserMasterLayout child={<AddActor />} />
    },
    {
        path: "/actor/edit/:id",
        element: <UserMasterLayout child={<UpdateActor />} />
    },

    // Director routes
    {
        path: "/director",
        element: <UserMasterLayout child={<ListDirector />} />
    },
    {
        path: "/director/add",
        element: <UserMasterLayout child={<AddDirector />} />
    },
    {
        path: "/director/edit/:id",
        element: <UserMasterLayout child={<UpdateDirector />} />
    },

    // User routes
    {
        path: "/user",
        element: <UserMasterLayout child={<ListUser />} />
    },
    {
        path: "/user/add",
        element: <UserMasterLayout child={<AddUser />} />
    },
    {
        path: "/user/edit/:id",
        element: <UserMasterLayout child={<UpdateUser />} />
    },

    // Comic routes
    {
        path: "/comic",
        element: <UserMasterLayout child={<ListComic />} />
    },
    {
        path: "/comic/add",
        element: <UserMasterLayout child={<AddComic />} />
    },
    {
        path: "/comic/details/:id",
        element: <UserMasterLayout child={<ComicDetails />} />
    },
    {
        path: "/comic/edit/:id",
        element: <UserMasterLayout child={<UpdateComic />} />
    },

    // Episode routes
    {
        path: "/episode",
        element: <UserMasterLayout child={<ShowListComic />} />
    },
    {
        path: "/episode/list/:id",
        element: <UserMasterLayout child={<ListEpisode />} />
    },
    {
        path: "/episode/add/:comicId",
        element: <UserMasterLayout child={<AddEpisode />} />
    },
    {
        path: "/episode/edit/:id",
        element: <UserMasterLayout child={<UpdateEpisode />} />
    },

    // Chapter images routes
    {
        path: "/images/:episodeId",
        element: <UserMasterLayout child={<ListChapterImage />} />
    },
    {
        path: "/images/add/:episodeId",
        element: <UserMasterLayout child={<AddImage />} />
    },
    {
        path: "/images/edit/:id",
        element: <UserMasterLayout child={<UpdateImage />} />
    },

    // Comic Routes
    {
        path: "/listComic",
        element: <UserMasterLayout child={<ListReviewComic />} />
    },
    {
        path: "review/list/:comicId",
        element: <UserMasterLayout child={<ListReview />} />
    }
]