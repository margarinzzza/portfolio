export const cities = [
  {
    id: 0,
    name: 'Москва',
    temperature: 30,
    time: new Date().toLocaleTimeString("en-US", {timeZone: "Europe/Moscow"}),
    pressure : 750,
    precipitation: true,
    wind: {
      speed: 11,
      direction: 'запад'
    }
  },
  {
    id: 1, 
    time: new Date().toLocaleTimeString("en-US", {timeZone: "Europe/Moscow"}),
    pressure : 740,
    precipitation: false,
    wind: { 
      speed: 7,
      direction: 'северо-запад'
    }
  },
  {
    id: 2,
    name: 'Петропавловск',
    temperature: 24,
    time: new Date().toLocaleTimeString("en-US", {timeZone: "Asia/Khandyga"}),
    pressure : 766,
    precipitation: false,
    wind: {
      speed: 13,
      direction: 'юго-восток'
    }
  },
  {
    id: 3,
    name: 'Омск',
    temperature: 22,
    time: new Date().toLocaleTimeString("en-US", {timeZone: "Asia/Tomsk"}),
    pressure : 768,
    precipitation: false,
    wind: {
      speed: 1,
      direction: 'восток'
    }
  },
  {
    id: 4,
    name: 'Томск',
    temperature: 16,
    time: new Date().toLocaleTimeString("en-US", {timeZone: "Asia/Tomsk"}),
    pressure : 770,
    precipitation: true,
    wind: {
      speed: 5,
      direction: 'юг'
    }
  },
  {
    id: 5,
    name: 'Саратов',
    temperature: 41,
    time: new Date().toLocaleTimeString("en-US", {timeZone: "Europe/Saratov"}),
    pressure : 765,
    precipitation: false,
    wind: {
      speed: 7,
      direction: 'север'
    }
  },
]