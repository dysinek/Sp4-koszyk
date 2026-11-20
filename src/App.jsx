import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const produkty = [
    { id: 1, nazwa: "Notes", cena: 12.50 },
    { id: 2, nazwa: "Długopis", cena: 3.20 },
    { id: 3, nazwa: "Plecak", cena: 89.00 },
    { id: 4, nazwa: "Kalkulator", cena: 45.90 },
    { id: 5, nazwa: "Zakreślacz", cena: 4.75 }
  ];

  const [koszyk, setKoszyk] = useState([]);

  function dodajDoKoszyka(produkt) {
    const istnieje = koszyk.some(item => item.id === produkt.id);

    let nowyKoszyk;

    if (istnieje) {
      nowyKoszyk = koszyk.map(item =>
        item.id === produkt.id
          ? { ...item, ilosc: item.ilosc + 1 }
          : item
      );
    } else {
      nowyKoszyk = [
        ...koszyk,
        {
          id: produkt.id,
          nazwa: produkt.nazwa,
          cena: produkt.cena,
          ilosc: 1
        }
      ];
    }

    setKoszyk(nowyKoszyk);

    const suma = nowyKoszyk.reduce(
      (wynik, item) => wynik + item.cena * item.ilosc,
      0
    );

    console.log(
      `Koszyk: ${nowyKoszyk.length} pozycji; suma: ${suma.toFixed(2)}`
    );
  }

  function usunZKoszyka(id) {
    const nowyKoszyk = koszyk.filter(item => item.id !== id);

    setKoszyk(nowyKoszyk);

    const suma = nowyKoszyk.reduce(
      (wynik, item) => wynik + item.cena * item.ilosc,
      0
    );

    console.log(
      `Koszyk: ${nowyKoszyk.length} pozycji; suma: ${suma.toFixed(2)}`
    );
  }

  const sumaKoszyka = koszyk.reduce(
    (wynik, item) => wynik + item.cena * item.ilosc,
    0
  );

  return (
    <div className="container mt-4">
      <div className="border rounded-4 p-4">

        <h2>Sklepik szkolny</h2>

        <ul className="list-group mb-4">
          {produkty.map(produkt => (
            <li
              key={produkt.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {produkt.nazwa} – {produkt.cena.toFixed(2)} zł

              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => dodajDoKoszyka(produkt)}
              >
                Do koszyka
              </button>
            </li>
          ))}
        </ul>

        <h3>Koszyk ({koszyk.length} pozycji)</h3>

        {koszyk.length === 0 ? (
          <div className="alert alert-info">
            Koszyk jest pusty
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Produkt</th>
                <th scope="col">Ilość</th>
                <th scope="col">Cena</th>
                <th scope="col">Suma</th>
                <th scope="col">Akcja</th>
              </tr>
            </thead>

            <tbody>
              {koszyk.map(item => (
                <tr key={item.id}>
                  <td>{item.nazwa}</td>
                  <td>{item.ilosc}</td>
                  <td>{item.cena.toFixed(2)} zł</td>
                  <td>
                    {(item.cena * item.ilosc).toFixed(2)} zł
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => usunZKoszyka(item.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p className="fw-bold">
          Suma: {sumaKoszyka.toFixed(2)} zł
        </p>

      </div>
    </div>
  );
}

export default App;