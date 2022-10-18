export const firstTaskState = [
  {
    id: 0,
    header: 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    imgSrc: 'https://w-dog.ru/wallpapers/0/63/451288677289029/ssha-chikago-neboskreby-amerika.jpg',
    spentTime: 1,
    listItems: [
      'Билет на целый день',
      'Неограниченное число катаний',
      '6 остановок у главных достопримечательностей',
    ],
    flights: ['12:00','13:00','14:00'],
    cost: 700,
    costAtPier: 1000,
    banner: {
      name: 'Новинка',
      bannerColor: 'blueBanner'
    }
  },
  {
    id: 1,
    header: 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    imgSrc: 'https://phonoteka.org/uploads/posts/2021-03/1616630811_25-p-nochnoi-gorod-fon-32.jpg',
    spentTime: 5,
    listItems: [
      'Билет на целый день',
      'Неограниченное число катаний',
      '6 остановок у главных достопримечательностей',
    ],
    flights: ['12:30','14:00','16:00','19:00'],
    cost: 1000,
    costAtPier: null,
    banner: {
      name: 'Круглый год',
      bannerColor: 'yellowBanner'
    }
  },
  {
    id: 2,
    header: 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    imgSrc: 'https://oir.mobi/uploads/posts/2019-12/1576095552_6-12.jpg',
    spentTime: 2,
    listItems: [
      'Билет на целый день',
      'Неограниченное число катаний',
      '6 остановок у главных достопримечательностей',
    ],
    flights: ['13:00','15:00','16:00','18:00','19:30','20:00'],
    cost: 900,
    costAtPier: 1200,
    banner: {
      name: '',
      bannerColor: ''
    }
  },
]

export const wayTypes = [
  {
    id: 0,
    name: 'из A в B',
    typeValue: 'AtoB'
  },
  {
    id: 1,
    name: 'из В в А',
    typeValue: 'BtoA'
  },
  {
    id: 2,
    name: 'из A в B и обратно в А',
    typeValue: 'AtoBtoA'
  },
]

export const ways = [

    {
      id: 0,
      type: 'AtoB',
      date: '2021-08-21',
      time: '18:00',
      travelTime: 50,
      cost: 700
    },

    {
      id: 1,
      type: 'AtoB',
      date: '2021-08-21',
      time: '18:30',
      travelTime: 50,
      cost: 700
    },

    {
      id: 2,
      type: 'AtoB',
      date: '2021-08-21',
      time: '18:45',
      travelTime: 50,
      cost: 700
    },

    {
      id: 3,
      type: 'AtoB',
      date: '2021-08-21',
      time: '19:00',
      travelTime: 50,
      cost: 700
    },

// BtoA

    {
      id: 4,
      type: 'BtoA',
      date: '2021-08-21',
      time: '18:30',
      travelTime: 50,
      cost: 700
    },

    {
      id: 5,
      type: 'BtoA',
      date: '2021-08-21',
      time: '18:45',
      travelTime: 50,
      cost: 700
    },


    {
      id: 6,
      type: 'BtoA',
      date: '2021-08-21',
      time: '19:00',
      travelTime: 50,
      cost: 700
    },

    {
      id: 7,
      type: 'BtoA',
      date: '2021-08-21',
      time: '19:35',
      travelTime: 50,
      cost: 700
    },

]