defmodule RoomReservationServer.AdminUserContext.AdminUser do
  use Ecto.Schema
  import Ecto.Changeset


  schema "admin_users" do
    field :name, :string
    field :password, :string, virtual: true
    # 默认密码"admin123"
    field :password_hash, :string, default: "$pbkdf2-sha512$160000$.0mu4IBJ8tD5cckQhz9tqQ$Iv05hJ49w8WqovfrVUfind8YFt.lrQpj2TNxVuSDXJ0FZHX2YMSl0l8M.FtqYoGdiZDvcTDUp/5xe4/RgkS7FQ"
    timestamps()
  end

  @doc false
  def changeset(admin_user, attrs) do
    admin_user
    |> cast(attrs, [:name, :password])
    |> validate_required([:name])
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Pbkdf2.hashpwsalt(password))
      _ ->
        changeset
    end
  end
end
