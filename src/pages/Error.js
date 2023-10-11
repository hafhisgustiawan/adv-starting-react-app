import { useRouteError } from 'react-router-dom';

import PageContent from './PageContent';

const Root = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <PageContent title={`${error.status ? error.status : ''} error occured!"`}>
      {error.data.message || 'Something went wrong!'}
    </PageContent>
  );
};

export default Root;
