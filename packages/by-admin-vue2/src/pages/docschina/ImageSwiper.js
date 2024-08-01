

const imgStyle = {
  width: '100%',
  height: '500px'
}


export default {
  data() {
    return {
      images: [
        { id: 1, src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" },
        { id: 2, src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" },
        { id: 3, src: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" },
      ],
    };
  },
  render(h) {
    return (
      <div>
        <el-carousel interval={5000} height={imgStyle.height} arrow="always">
          {this.images.map((image) => (
            <el-carousel-item key={image.id} >
              <img src={image.src} style={imgStyle}/>
            </el-carousel-item>
          ))}
        </el-carousel>
      </div>
    );
  },
};
