const uri = process.env.URI;

let data = {
  components: [
    {
      name: "image",
      refreshTime: -1,
      endPoint: "",
      list: "",
      x: 0,
      y: 0,
      w: 3,
      h: 3,
      animationTime: 1,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: "",
      list: "",
      x: 5,
      y: 0,
      w: 3,
      h: 2,
      animationTime: 8,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: "",
      list: "",
      x: 8,
      y: 3,
      w: 3,
      h: 4,
      animationTime: 1.5,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: "",
      list: "",
      x: 18,
      y: 1,
      w: 4,
      h: 3,
      animationTime: 8.5,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: "",
      list: "",
      x: 17,
      y: 5,
      w: 3,
      h: 2,
      animationTime: 2,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: "image",
      refreshTime: -1,
      endPoint: "",
      list: "",
      x: 29,
      y: 2,
      w: 3,
      h: 2,
      animationTime: 9,
      data: {
        name: '',
        url: '',
        title: ''
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 0,
      y: 3,
      w: 3,
      h: 4,
      animationTime: '1',
      data: {
        text: ""
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 8,
      y: 0,
      w: 3,
      h: 2,
      animationTime: '8',
      data: {
        text: ""
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 11,
      y: 4,
      w: 3,
      h: 3,
      animationTime: '1.5',
      data: {
        text: ""
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 15,
      y: 1,
      w: 3,
      h: 3,
      animationTime: '8.5',
      data: {
        text: ""
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 20,
      y: 5,
      w: 4,
      h: 2,
      animationTime: '2',
      data: {
        text: ""
      }
    },
    {
      name: 'text',
      refreshTime: -1,
      endPoint: '',
      list: '',
      x: 29,
      y: 4,
      w: 3,
      h: 3,
      animationTime: '9',
      data: {
        text: ""
      }
    },
    {
      name: 'blank',
      x: 3,
      y: 0,
      w: 2,
      h: 2,
      data: {}
    },
    {
      name: 'blank',
      x: 12,
      y: 2,
      w: 3,
      h: 2,
      data: {}
    },
    {
      name: 'blank',
      x: 22,
      y: 1,
      w: 2,
      h: 4,
      data: {}
    },
    {
      name: 'blank',
      x: 27,
      y: 1,
      w: 7,
      h: 1,
      data: {}
    },
    {
      name: 'blank',
      x: -1,
      y: -1,
      animationTime: '3.0',
      soundID: 'heritageLinesShow',
      data: {}
    }
  ],
  lines: [
    {
      animationTime: '3.0',
      animationDuration: '5.0',
      points: [
        {
          x: 780,
          y: 270
        },
        {
          x: 1300,
          y: 270
        }
      ]
    },
    {
      animationTime: '3.5',
      animationDuration: '5.0',
      points: [
        {
          x: 3250,
          y: 1080
        },
        {
          x: 3250,
          y: 675
        },
        {
          x: 3900,
          y: 675
        }
      ]
    },
    {
      animationTime: '4.0',
      animationDuration: '5.0',
      points: [
        {
          x: 5980,
          y: 1350
        },
        {
          x: 5980,
          y: 405
        },
        {
          x: 7930,
          y: 405
        },
        {
          x: 7930,
          y: 540
        }
      ]
    }
  ]
}

module.exports.data = data;