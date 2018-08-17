defmodule RoomReservationServer.RoomOrderInfoContext.RoomOrderInfo do
  use Ecto.Schema
  import Ecto.Changeset
  alias RoomReservationServer.RoomLayoutContext.RoomLayout
  alias RoomReservationServer.Accounts.User

  schema "room_order_info" do

    field :start_time, :date
    field :days, :integer
    field :rooms, :integer
    field :comment, :string
    field :status, :boolean, default: true

    belongs_to :layout, RoomLayout, on_replace: :nilify
    belongs_to :user, User, on_replace: :nilify
    
    timestamps()
  end

  @doc false
  def changeset(room_order_info, attrs) do
    room_order_info
    |> cast(attrs, [:start_time, :days, :rooms, :comment, :status])
    |> validate_required([:start_time, :status])
  end
end
