const uri = process.env.URI;

let data = {
  components: [
    {
      name: "image",
      refreshTime: -1,
      endPoint: "",
      list: "",
      x: 0,
      y: 2,
      w: 3,
      h: 2,
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
      x: 8,
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
      x: 11,
      y: 5,
      w: 4,
      h: 3,
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
      x: 20,
      y: 3,
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
      x: 13,
      y: 1,
      w: 2,
      h: 3,
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
      x: 24,
      y: 0,
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
      y: 4,
      w: 3,
      h: 3,
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
      y: 2,
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
      x: 15,
      y: 5,
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
      x: 20,
      y: 6,
      w: 4,
      h: 2,
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
      x: 15,
      y: 1,
      w: 3,
      h: 3,
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
      x: 27,
      y: 0,
      w: 4,
      h: 2,
      animationTime: '9',
      data: {
        text: ""
      }
    },
    {
      name: 'blank',
      x: 1,
      y: 0,
      w: 7,
      h: 2,
      data: {}
    },
    {
      name: 'blank',
      x: 18,
      y: 6,
      w: 2,
      h: 2,
      data: {}
    },
    {
      name: 'blank',
      x: 16,
      y: 0,
      w: 8,
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
          x: 390,
          y: 540
        },
        {
          x: 390,
          y: 270
        },
        {
          x: 2080,
          y: 270
        }
      ]
    },
    {
      animationTime: '3.5',
      animationDuration: '5.0',
      points: [
        {
          x: 4680,
          y: 1890
        },
        {
          x: 5200,
          y: 1890
        }
      ]
    },
    {
      animationTime: '4.0',
      animationDuration: '5.0',
      points: [
        {
          x: 4290,
          y: 270
        },
        {
          x: 4290,
          y: 135
        },
        {
          x: 6240,
          y: 135
        }
      ]
    }
  ]
}

module.exports.data = data;