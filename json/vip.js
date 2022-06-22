const uri = process.env.URI;

let data = {
  components: [
    {
      name: 'vip',
      x: 9,
      y: 3,
      data:
      {
        title: 'Dow Chemical Company Welcomes',
        logo: `${uri}/images/VipLogoDow.png`,
        refreshTime: '3',
        loops: '999',
        list: []
      }
    },
    {
      name: 'image',
      id: 'image1',
      x: 0,
      y: 2,
      w: 3,
      h: 3,
      hidden: true,
      data: {}
    },
    {
      name: 'image',
      id: 'image2',
      x: 29,
      y: 5,
      w: 3,
      h: 3,
      hidden: true,
      data: {}
    },
    {
      name: 'image',
      id: 'image3',
      x: 1,
      y: 6,
      w: 2,
      h: 2,
      hidden: true,
      data: {}
    },
    {
      name: 'image',
      id: 'image4',
      x: 29,
      y: 2,
      w: 2,
      h: 2,
      hidden: true,
      data: {}
    },
    {
      name: 'image',
      id: 'image5',
      x: 4,
      y: 0,
      w: 2,
      h: 2,
      hidden: true,
      data: {}
    },
    {
      name: 'image',
      id: 'image6',
      x: 26,
      y: 0,
      w: 2,
      h: 2,
      hidden: true,
      data: {}
    }
  ],
  lines: [],
  soundID: 'VIP'
}

module.exports.data = data;