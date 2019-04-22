defmodule RoomReservationServer.CarOrderContext.CarOrder do
  use Ecto.Schema
  import Ecto.Changeset

  alias RoomReservationServer.Accounts.User


  schema "car_orders" do
    field :carNo, :string
    field :kind, :string
    field :orderDate, :date
    field :orderNo, :string
    field :state, :string, default: "t"
    field :userNo, :string
    field :occupant, :string
    field :phone, :string

    belongs_to :user, User, on_replace: :nilify

    timestamps()
  end

  @doc false
  def changeset(car_order, attrs) do
    car_order
    |> cast(attrs, [:orderNo, :orderDate, :kind, :carNo, :userNo, :state, :occupant, :phone])
    # |> validate_required([:orderNo])
  end
end
