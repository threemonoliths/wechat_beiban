defmodule RoomReservationServer.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :open_id, :string
    field :name, :string
    field :mobile, :string
    field :company, :string
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:open_id, :name, :mobile, :company])
    |> validate_required([:open_id, :name, :mobile])
    |> unique_constraint(:open_id)
    |> unique_constraint(:mobile)
  end
end
