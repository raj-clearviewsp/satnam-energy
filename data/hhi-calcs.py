from __future__ import annotations
import sys
from typing import Any, Sequence
import pandas as pd

YEARS: Sequence[Any] = [
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, "2023 Provisional"
]

PRIMARY_PRODUCTS: Sequence[str] = [
    "Coal, peat and oil shale",
    "Crude, NGL and feedstocks",
    "Natural gas",
    "Nuclear",
    "Renewables and waste",
]

# ------------------------------------------------------------------
def resolve_year_column(year_spec: Any, columns: pd.Index) -> Any:
    """Return the exact column label for *year_spec*."""
    cand: list[Any] = [year_spec]

    def _suffixes(base: str) -> list[str]:
        return [
            "", ".0", " Provisional", " provisional",
            " Preliminary", " preliminary"
        ]

    if isinstance(year_spec, str) and year_spec.isdigit():
        num = int(year_spec)
        cand.extend([num, float(num)])
        cand.extend([year_spec + s for s in _suffixes(year_spec)])
    elif isinstance(year_spec, (int, float)):
        num = int(year_spec)
        cand.append(float(num))
        cand.extend([str(num) + s for s in _suffixes(str(num))])

    for c in cand:
        if c in columns:
            return c
    raise KeyError(f"Cannot find column for {year_spec!r}. Available: {list(columns)}")

# ------------------------------------------------------------------
def load_primary_tes(xlsx_path: str, sheet_name: str | None) -> pd.DataFrame:
    xl = pd.ExcelFile(xlsx_path)
    sheet = sheet_name or xl.sheet_names[0]
    df_raw = xl.parse(sheet, header=None)
    df = df_raw.iloc[1:].copy()
    df.columns = df_raw.iloc[0, :]
    tes = df[df["Flow"] == "Total energy supply (PJ)"].copy()
    primary = tes[tes["Product"].isin(PRIMARY_PRODUCTS)].copy()
    return primary

# ------------------------------------------------------------------
def main() -> None:
    xlsx_path = sys.argv[1] if len(sys.argv) > 1 else "U.S. energy balances.xlsx"
    sheet_name = sys.argv[2] if len(sys.argv) > 2 else None

    primary = load_primary_tes(xlsx_path, sheet_name)

    # Resolve actual column labels in chronological order
    col_labels: list[Any] = [resolve_year_column(y, primary.columns) for y in YEARS]

    # Convert to numeric and forward‑fill missing values along the time axis
    primary[col_labels] = primary[col_labels].apply(pd.to_numeric, errors="coerce")
    primary[col_labels] = primary[col_labels].ffill(axis=1)

    # Calculate HHI and shares
    hhi_list: list[float] = []
    share_by_prod = {p: [] for p in PRIMARY_PRODUCTS}

    for col in col_labels:
        total = primary[col].sum()
        shares = (primary[col] / total).round(4)
        hhi_list.append(round((shares**2).sum() * 10_000, 0))
        for prod, share in zip(primary["Product"], shares):
            share_by_prod[prod].append(float(share))

    # Print in required block format
    indent = "          "
    print(f"{indent}hhi: {hhi_list},")
    for prod in PRIMARY_PRODUCTS:
        print(f"{indent}name: \"{prod}\",")
        print(f"{indent}values: {share_by_prod[prod]},")
# ------------------------------------------------------------------
if __name__ == "__main__":
    main()
