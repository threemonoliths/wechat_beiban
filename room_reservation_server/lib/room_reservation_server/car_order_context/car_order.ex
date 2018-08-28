defmodule RoomReservationServer.CarOrderContext.CarOrder do
  use Ecto.Schema
  import Ecto.Changeset


  schema "car_orders" do
    field :carNo, :string
    field :kind, :string
    field :orderDate, :date
    field :orderNo, :string
    field :state, :string
    field :userNo, :string

    timestamps()
  end

  @doc false
  def changeset(car_order, attrs) do
    car_order
    |> cast(attrs, [:orderNo, :orderDate, :kind, :carNo, :userNo, :state])
    # |> validate_required([:orderNo])
  end
end
