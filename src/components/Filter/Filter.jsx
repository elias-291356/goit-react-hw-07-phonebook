export function Filter({ onChange, name }) {
  return (
    <div>
      <h2 className="subtitle is-1">Contacts</h2>
      <label className="label">Find contact by name</label>
      <input
        onChange={onChange}
        className="input is-success"
        required
        value={name}
      />
    </div>
  );
}
