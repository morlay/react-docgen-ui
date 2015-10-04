export default {
  src: 'public',
  options: {
    push: false,
    dotfiles: true,
    logger: (message)=> {
      console.log(message);
    }
  }
}