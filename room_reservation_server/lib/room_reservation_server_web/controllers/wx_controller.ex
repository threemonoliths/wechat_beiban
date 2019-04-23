defmodule RoomReservationServerWeb.WxController do
  use RoomReservationServerWeb, :controller

  use RoomReservationServer.CarContext
  alias RoomReservationServer.CarContext
  alias RoomReservationServer.CarContext.Car

  def get_openid(conn, params) do
    code = Map.get(params, "code")
    url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx2f96d17009ae641b&secret=570467ff0c7bfa03379be800311cf6e2&code=#{code}&grant_type=authorization_code"
    HTTPoison.start
    resp = HTTPoison.get!(url)
    result = Poison.Parser.parse! (resp.body) 
    IO.inspect url
    
    # data = result |> Map.get("data")
    # recordCnt = data |> Map.get("recordCnt")
    # pageCnt = data |> Map.get("pageCnt")
    json conn, result
  end

end
