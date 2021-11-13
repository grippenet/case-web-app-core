import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Extension } from '../../../AppCore';
import { useIsAuthenticated } from '../../../hooks/useIsAuthenticated';
import { PageConfig } from '../../../types/pagesConfig';
import { DefaultRoutes } from '../../../types/routing';
import ContentRenderer from './ContentRenderer';


interface RouteToLayoutProps {
  path: string;
  pageConfig: PageConfig;
  defaultRoutes: DefaultRoutes;
  extensions?: Extension[];
}

const RouteToLayout: React.FC<RouteToLayoutProps> = (props) => {
  // const { t } = useTranslation([props.pageConfig.pageKey]);
  const isAuthenticated = useIsAuthenticated();

  if (
    (props.pageConfig.hideWhen === 'auth' && isAuthenticated) ||
    (props.pageConfig.hideWhen === 'unauth' && !isAuthenticated)
  ) {
    return <Route
      path={props.path}
      render={routeProps =>
        <Redirect to={isAuthenticated ? props.defaultRoutes.auth : props.defaultRoutes.unauth} />
      }
    />
  }

  return (
    <Route
      path={props.path}
      render={routeProps =>
        <ContentRenderer
          isAuthenticated={isAuthenticated}
          hideTitleBar={props.pageConfig.hideTitleBar}
          pageKey={props.pageConfig.pageKey}
          rows={props.pageConfig.rows}
          subPages={props.pageConfig.subPages}
          defaultRoutes={props.defaultRoutes}
          extensions={props.extensions}
        />
      }
    />
  );
};

export default RouteToLayout;
