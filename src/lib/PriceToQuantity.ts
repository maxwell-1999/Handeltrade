function cuberoot(x) {
  let y = Math.pow(Math.abs(x), 1 / 3);
  return x < 0 ? -y : y;
}

const M = 1e18;
function solveCubic(a, b, c, d) {
  if (Math.abs(a) < 1e-8) {
    // Quadratic case, ax^2+bx+c=0
    a = b;
    b = c;
    c = d;
    if (Math.abs(a) < 1e-8) {
      // Linear case, ax+b=0
      a = b;
      b = c;
      if (Math.abs(a) < 1e-8)
        // Degenerate case
        return [];
      return [-b / a];
    }
    let D = b * b - 4 * a * c;
    if (Math.abs(D) < 1e-8) return [-b / (2 * a)];
    else if (D > 0)
      return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
    return [];
  }
  // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
  let p = (3 * a * c - b * b) / (3 * a * a);
  let q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
  let roots;
  if (Math.abs(p) < 1e-8) {
    // p = 0 -> t^3 = -q -> t = -q^1/3
    roots = [cuberoot(-q)];
  } else if (Math.abs(q) < 1e-8) {
    // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
    roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
  } else {
    let D = (q * q) / 4 + (p * p * p) / 27;
    if (Math.abs(D) < 1e-8) {
      // D = 0 -> two roots
      roots = [(-1.5 * q) / p, (3 * q) / p];
    } else if (D > 0) {
      // Only one real root
      let u = cuberoot(-q / 2 - Math.sqrt(D));
      roots = [u - p / (3 * u)];
    } else {
      // D < 0, three roots, but needs to use complex numbers/trigonometric solution
      let u = 2 * Math.sqrt(-p / 3);
      let t = Math.acos((3 * q) / p / u) / 3; // D < 0 implies p < 0 and acos argument in [-1..1]
      let k = (2 * Math.PI) / 3;
      roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
    }
  }
  // Convert back from depressed cubic
  for (let i = 0; i < roots.length; i++) roots[i] -= b / (3 * a);
  return roots;
}

export function getSharesFromPrice(supply, price, X = 1) {
  if (supply == 0 || price == 0) {
    return 0;
  }
  const coefficients = [
    2,
    6 * supply - 3 * X,
    6 * supply * supply - 6 * supply * X + X * X,
    -9600 * X * X * price,
  ];
  const ans = Math.round(solveCubic(...coefficients)[0]);
  return ans;
}
