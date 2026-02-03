import styles from './styles.module.scss';

export const metadata = {
  title: 'Quem Somos | Centro Pokémon',
  description: 'Conheça o Centro Pokémon e como cuidamos do seu pokémon com alta tecnologia.',
};

export default function QuemSomos() {
  return (
    <main className={styles.main}>
      <h1>O Centro Pokémon</h1>

      <section>
        <h2>Como funciona a cura de um pokémon?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel mi ut nunc
          sodales mattis eget at sem. Praesent mattis interdum nulla, quis molestie justo
          lacinia a. Curabitur rutrum ante a ligula aliquet pellentesque.
        </p>
        <p>
          Phasellus ut elit fermentum, lacinia felis iaculis, aliquam augue. Vestibulum dignissim
          dignissim nisi sed tincidunt. Fusce magna magna, porta sit amet accumsan at,
          ullamcorper id magna.
        </p>
      </section>

      <section>
        <h2>Uma tradição de mais de 20 anos</h2>
        <p>
          Etiam ac nisi sagittis, ullamcorper ex vel, dignissim urna. Mauris commodo diam ac
          purus elementum, nec molestie arcu tincidunt. Donec quis sollicitudin sapien,
          vitae tincidunt lorem.
        </p>
        <p>
          Sed vel est et orci pharetra interdum. Donec felis mauris, faucibus in hendrerit sed,
          malesuada vitae mi.
        </p>
      </section>

      <section>
        <h2>O melhor para seu pokémon</h2>
        <p>
          Quisque porta cursus metus, id posuere mi commodo ac. Proin auctor nisl eu mattis
          dignissim. Nullam efficitur, eros a sollicitudin dignissim, nunc risus sollicitudin
          nunc, vitae lacinia erat mi sed dui.
        </p>
        <p>
          Mauris ante quam, malesuada eget ornare id, pellentesque nec felis. Nulla nec felis
          elementum, tristique ligula vel, aliquet erat.
        </p>
      </section>

      <section>
        <h2>Alta Tecnologia</h2>
        <p>
          Fusce vitae ex pharetra, gravida turpis in, pretium dui. Nulla fringilla odio sed
          dolor varius cursus vitae at lectus. Aenean fermentum ligula sed tincidunt venenatis.
        </p>
        <p>
          Integer viverra condimentum orci, quis consequat odio imperdiet ut. Praesent maximus
          diam porttitor est sodales, id posuere lacus porta.
        </p>
      </section>
    </main>
  );
}
