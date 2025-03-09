import Header from '@app/components/Common/Header';
import ListView from '@app/components/Common/ListView';
import PageTitle from '@app/components/Common/PageTitle';
import useDiscover from '@app/hooks/useDiscover';
import Error from '@app/pages/_error';
import type { WatchlistItem } from '@server/interfaces/api/discoverInterfaces';
import { useRouter } from 'next/router';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  discoverwatchlist: 'Your Watchlist',
  watchlist: 'Watchlist',
});

const DiscoverExternalWatchlist = () => {
  const intl = useIntl();
  const router = useRouter();
  const apiUrl: string = (router.query.apiUrl || '') as string;

  const {
    isLoadingInitialData,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    titles,
    fetchMore,
    error,
  } = useDiscover<WatchlistItem>(decodeURIComponent(apiUrl));

  if (error) {
    return <Error statusCode={500} />;
  }

  const title = router.query.title || intl.formatMessage(messages.watchlist);

  return (
    <>
      <PageTitle title={title} />
      <div className="mt-1 mb-5">
        <Header>{title}</Header>
      </div>
      <ListView
        plexItems={titles}
        isEmpty={isEmpty}
        isLoading={
          isLoadingInitialData || (isLoadingMore && (titles?.length ?? 0) > 0)
        }
        isReachingEnd={isReachingEnd}
        onScrollBottom={fetchMore}
      />
    </>
  );
};

export default DiscoverExternalWatchlist;
