defmodule RoomReservationServerWeb.WxController do
  use RoomReservationServerWeb, :controller

  def get_userinfo(conn, params) do
    code = Map.get(params, "code")
    get_access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx2f96d17009ae641b&secret=570467ff0c7bfa03379be800311cf6e2&code=#{code}&grant_type=authorization_code"
    HTTPoison.start
    resp = HTTPoison.get!(get_access_token_url)
    result = Poison.Parser.parse! (resp.body) 

    access_token = Map.get(result, "access_token")
    open_id = Map.get(result, "openid")
    get_userinfo_url = "https://api.weixin.qq.com/sns/userinfo?access_token=#{access_token}&openid=#{open_id}&lang=zh_CN"
    resp = HTTPoison.get!(get_userinfo_url)
    result_userinfo = Poison.Parser.parse! (resp.body) 

    IO.inspect Map.merge(result, result_userinfo)
    json conn, Map.merge(result, result_userinfo)
  end

end
