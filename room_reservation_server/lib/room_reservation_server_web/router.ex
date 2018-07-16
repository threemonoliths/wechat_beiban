defmodule RoomReservationServerWeb.Router do
  use RoomReservationServerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug Guardian.Plug.Pipeline, module: RoomReservationServerWeb.Guardian,
      error_handler: RoomReservationServerWeb.AuthErrorHandler
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/", RoomReservationServerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # 管理后台API
  scope "/admin_api/v1", RoomReservationServerWeb do
    pipe_through [:api, :api_auth]

    resources "/users", UserController, except: [:new, :edit]
    resources "/dicts", DictController, except: [:new, :edit]
    resources "/layouts", LayoutController, except: [:new, :edit]
    resources "/rooms", RoomController, except: [:new, :edit]
    resources "/room_order_info", RoomOrderInfoController, except: [:new, :edit]
    
  end

  # 手机端API
  scope "/app_api/v1", RoomReservationServerWeb do
    pipe_through [:api, :api_auth]

  end
  
end
