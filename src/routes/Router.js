import React, { lazy } from "react";
import { Router, Switch } from "react-router-dom";
import { history } from "../history";
import { connect } from "react-redux";
import PublicRouteConfig from "./public-route";
import PrivateRouteConfig from "./private-route";
import ValidateTokenResetPasswordRouteConfig from "./validate-token-reset-password";
import ResetPasswordRouteConfig from "./reset-password-route";
import ValidateTokenRegisterRouteConfig from "./validate-token-register-route";

const HomePage = lazy(() => import("../views/pages/home/home"));

const MenuPage = lazy(() => import("../views/pages/menus/menu"));

const MajorsPage = lazy(() => import("../views/pages/majors/majors"));

const GradesPage = lazy(() => import("../views/pages/grades/grades"));

const GroupPage = lazy(() => import("../views/pages/group/group"));

const ReportPage = lazy(() => import("../views/pages/report-page/report"));

const CoursePage = lazy(() => import("../views/pages/course/course"));

const CreateCoursePage = lazy(() =>
  import("../views/pages/course/create/course-create")
);

const UpdateCoursePage = lazy(() =>
  import("../views/pages/course/update/update-course")
);

const Settings = lazy(() => import("../views/pages/settings-page/settings"));

const RolesPage = lazy(() => import("../views/pages/roles/roles"));

const StagesPage = lazy(() => import("../views/pages/stages/stages"));

const YearsPage = lazy(() => import("../views/pages/years/years"));

const TeachersPage = lazy(() => import("../views/pages/teachers/teachers"));

const NotAuthorizedPage = lazy(() =>
  import("../views/pages/misc/unauthorized")
);

const UpdateTeachersPage = lazy(() =>
  import("../views/pages/teachers/update/update-teacher")
);

const CreateTeachersPage = lazy(() =>
  import("../views/pages/teachers/create/create-teacher")
);

const DetailsTeacherPage = lazy(() =>
  import("../views/pages/teachers/details/details-teacher")
);

const DetailCoursePage = lazy(() =>
  import("../views/pages/detail-course/detail-course")
);

const UsersTeacherPage = lazy(() =>
  import("../views/pages/users-teacher/users-teacher")
);
const UsersStudentPage = lazy(() =>
  import("../views/pages/users-student/users-student")
);
const UsersAdminPage = lazy(() =>
  import("../views/pages/users-admin/users-admin")
);

const CurriculumPage = lazy(() =>
  import("../views/pages/curriculum/curriculum")
);

const ClassRoomsPage = lazy(() =>
  import("../views/pages/classrooms/classrooms")
);

const ClassRoomsDetailPage = lazy(() =>
  import("../views/pages/classrooms/details/classrooms-details")
);

const PrivilegesPage = lazy(() =>
  import("../views/pages/privileges/privileges")
);

const PrivilegesDetailPage = lazy(() =>
  import("../views/pages/privileges/details/details-privileges")
);

const SchedulesPage = lazy(() => import("../views/pages/schedules/schedules"));

const CreateSchedulesPage = lazy(() =>
  import("../views/pages/schedules/create/create-schedules")
);

const UsersPage = lazy(() => import("../views/pages/users/users"));

const LoginPage = lazy(() =>
  import("../views/pages/authentication/login/Login")
);

const register = lazy(() =>
  import("../views/pages/authentication/register/Register")
);

const ForgotPasswordPage = lazy(() =>
  import("../views/pages/authentication/forgot-password/forgot-password")
);

const ResetPasswordPage = lazy(() =>
  import("../views/pages/authentication/reset-password/reset-password")
);

const ValidateTokenResetPasswordPage = lazy(() =>
  import(
    "../views/pages/authentication/validate-token-reset-password/validate-token-reset-password"
  )
);

const ValidateTokenRegisterPage = lazy(() =>
  import(
    "../views/pages/authentication/validate-token-register/validate-token-register"
  )
);

const DetailUserPage = lazy(() =>
  import("../views/pages/detail-users/detail-users")
);

const DetailRoomsPage = lazy(() =>
  import("../views/pages/detail-rooms/detail-rooms")
);

const RoomsPage = lazy(() => import("../views/pages/rooms/rooms"));

const ErrorsPage = lazy(() => import("../views/pages/errors-page/errors-page"));

const mapStateToProps = (state) => {
  return {
    user: state.auth.auth,
  };
};

const PublicAppRoute = connect(mapStateToProps, null)(PublicRouteConfig);

const PrivateAppRoute = connect(mapStateToProps, null)(PrivateRouteConfig);

const ValidateTokenResetPasswordAppRoute = connect(
  mapStateToProps,
  null
)(ValidateTokenResetPasswordRouteConfig);

const ResetPasswordAppRoute = connect(
  mapStateToProps,
  null
)(ResetPasswordRouteConfig);

const ValidateTokenRegisterAppRoute = connect(
  mapStateToProps,
  null
)(ValidateTokenRegisterRouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <PrivateAppRoute
            path="/unauthorized"
            component={NotAuthorizedPage}
            fullLayout
          />
          <PrivateAppRoute exact path="/" component={HomePage} />
          <PrivateAppRoute
            path="/privileges/:id"
            component={PrivilegesDetailPage}
          />
          <PrivateAppRoute path="/privileges" component={PrivilegesPage} />
          <PrivateAppRoute path="/roles" component={RolesPage} />
          <PrivateAppRoute
            path="/schedules/create"
            component={CreateSchedulesPage}
          />
          <PrivateAppRoute path="/schedules" component={SchedulesPage} />
          <PrivateAppRoute path="/menu" component={MenuPage} />
          <PrivateAppRoute path="/majors" component={MajorsPage} />
          <PrivateAppRoute path="/group" component={GroupPage} />
          <PrivateAppRoute path="/grades" component={GradesPage} />
          <PrivateAppRoute path="/curriculum" component={CurriculumPage} />
          <PrivateAppRoute path="/course/create" component={CreateCoursePage} />
          <PrivateAppRoute
            path="/course/:id/update"
            component={UpdateCoursePage}
          />
          <PrivateAppRoute path="/course/:id" component={DetailCoursePage} />
          <PrivateAppRoute path="/course" component={CoursePage} />
          <PrivateAppRoute path="/settings" component={Settings} />
          <PrivateAppRoute path="/stages" component={StagesPage} />
          <PrivateAppRoute path="/years" component={YearsPage} />
          <PrivateAppRoute
            path="/teachers/:id/update"
            component={UpdateTeachersPage}
          />
          <PrivateAppRoute
            path="/teachers/create"
            component={CreateTeachersPage}
          />
          <PrivateAppRoute
            path="/teachers/:id"
            component={DetailsTeacherPage}
          />
          <PrivateAppRoute path="/teachers" component={TeachersPage} />
          <PrivateAppRoute path="/reports" component={ReportPage} />
          <PrivateAppRoute path="/errors" component={ErrorsPage} />
          <PrivateAppRoute path="/users/:id" component={DetailUserPage} />
          <PrivateAppRoute path="/teacher" component={UsersTeacherPage} />
          <PrivateAppRoute path="/student" component={UsersStudentPage} />
          <PrivateAppRoute path="/admin" component={UsersAdminPage} />
          <PrivateAppRoute path="/users" component={UsersPage} />
          <PrivateAppRoute
            path="/classrooms/:id"
            component={ClassRoomsDetailPage}
          />
          <PrivateAppRoute path="/classrooms" component={ClassRoomsPage} />
          <PrivateAppRoute path="/rooms/:id" component={DetailRoomsPage} />
          <PrivateAppRoute path="/rooms" component={RoomsPage} />
          <ResetPasswordAppRoute
            path="/account/reset-password/act"
            component={ResetPasswordPage}
            fullLayout
          />
          <ValidateTokenResetPasswordAppRoute
            path="/account/reset-password"
            component={ValidateTokenResetPasswordPage}
          />
          <ValidateTokenRegisterAppRoute
            path="/account/verify-email"
            component={ValidateTokenRegisterPage}
          />
          <PublicAppRoute path="/login" component={LoginPage} fullLayout />
          <PublicAppRoute path="/register" component={register} fullLayout />
          <PublicAppRoute
            path="/forgot-password"
            component={ForgotPasswordPage}
            fullLayout
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
