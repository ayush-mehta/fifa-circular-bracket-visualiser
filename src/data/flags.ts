// Explicit imports of only the 32 flags this bracket uses, so the bundle ships
// just those (a glob would inline/emit all ~260 flag-icons SVGs). Each import
// resolves to a bundled asset URL — fully offline, no CDN/CSP dependency.

import br from 'flag-icons/flags/1x1/br.svg';
import jp from 'flag-icons/flags/1x1/jp.svg';
import ci from 'flag-icons/flags/1x1/ci.svg';
import no from 'flag-icons/flags/1x1/no.svg';
import mx from 'flag-icons/flags/1x1/mx.svg';
import ec from 'flag-icons/flags/1x1/ec.svg';
import gbEng from 'flag-icons/flags/1x1/gb-eng.svg';
import cd from 'flag-icons/flags/1x1/cd.svg';
import ar from 'flag-icons/flags/1x1/ar.svg';
import cv from 'flag-icons/flags/1x1/cv.svg';
import au from 'flag-icons/flags/1x1/au.svg';
import eg from 'flag-icons/flags/1x1/eg.svg';
import ch from 'flag-icons/flags/1x1/ch.svg';
import dz from 'flag-icons/flags/1x1/dz.svg';
import co from 'flag-icons/flags/1x1/co.svg';
import gh from 'flag-icons/flags/1x1/gh.svg';
import de from 'flag-icons/flags/1x1/de.svg';
import py from 'flag-icons/flags/1x1/py.svg';
import fr from 'flag-icons/flags/1x1/fr.svg';
import se from 'flag-icons/flags/1x1/se.svg';
import za from 'flag-icons/flags/1x1/za.svg';
import ca from 'flag-icons/flags/1x1/ca.svg';
import nl from 'flag-icons/flags/1x1/nl.svg';
import ma from 'flag-icons/flags/1x1/ma.svg';
import pt from 'flag-icons/flags/1x1/pt.svg';
import hr from 'flag-icons/flags/1x1/hr.svg';
import es from 'flag-icons/flags/1x1/es.svg';
import at from 'flag-icons/flags/1x1/at.svg';
import us from 'flag-icons/flags/1x1/us.svg';
import ba from 'flag-icons/flags/1x1/ba.svg';
import be from 'flag-icons/flags/1x1/be.svg';
import sn from 'flag-icons/flags/1x1/sn.svg';

const FLAGS: Record<string, string> = {
  br, jp, ci, no, mx, ec, 'gb-eng': gbEng, cd, ar, cv, au, eg, ch, dz, co, gh,
  de, py, fr, se, za, ca, nl, ma, pt, hr, es, at, us, ba, be, sn,
};

export function flagUrl(iso2: string): string | undefined {
  return FLAGS[iso2];
}
