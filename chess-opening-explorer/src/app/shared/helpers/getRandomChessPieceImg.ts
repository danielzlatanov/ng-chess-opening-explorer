export function getRandomChessPiece(): string {
  const chessPieces = [
    'bb.png',
    'bw.png',
    'kb.png',
    'kw.png',
    'nb.png',
    'nw.png',
    'pb.png',
    'pw.png',
    'qb.png',
    'qw.png',
    'rb.png',
    'rw.png',
  ];

  const randomIndex = Math.floor(Math.random() * chessPieces.length);
  const imgPath = `/assets/images/chess-pieces/${chessPieces[randomIndex]}`;
  return imgPath;
}
