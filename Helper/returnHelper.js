const Ok = (msg = '请求成功') => {
  return {
    state: 'ok',
    msg: msg
  }
}

export {
  Ok
}