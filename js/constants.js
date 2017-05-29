export const constants = {
  defaults: {
    title: '#Command'
  },
  colors: {
    brand1: 'red',
    brand2: 'orange',
    gray: '#bdbdbd'
  },
  imgs: {
    logo: require('./../img/logo.png'),
    menuIcon: require('./../img/toolbar_menu.png')
  },
  youtube: {
    resultsInRequest: 10,
    apiKey: 'youtube_data_api_key',
    channelId: 'youtube_channel_id'
  },
  localized: {
    drawer: {
      ru: {
        newsText: 'Новости',
        calendarText: 'Расписание матчей',
        tableText: 'Турнирная таблица',
        academyText: 'Детская академия',
        calendarLink: 'http://link.by',
        tableLink: 'http://link.by',
        academyLink: 'http://link.by',
        eSportsLink: 'http://link.by'
      },
      en: {
        newsText: 'News',
        calendarText: 'Calendar',
        tableText: 'Table',
        academyText: 'Youth academy',
        calendarLink: 'http://en.link.by',
        tableLink: 'http://en.link.by',
        academyLink: 'http://en.link.by',
        eSportsLink: 'http://en.link.by'
      }
    },
    lists: {
      ru: {
        locale: 'ru',
        moreText: 'Показать больше',
        requestLink: {
          broadcast: 'link.json',
          news: 'link.json'
        }
      },
      en: {
        locale: 'en',
        moreText: 'Show more',
        requestLink: {
          broadcast: 'link.json',
          news: 'link.json'
        }
      }
    }
  }
}
