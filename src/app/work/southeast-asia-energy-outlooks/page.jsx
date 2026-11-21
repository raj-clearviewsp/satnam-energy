import OutlookPaths from '@/components/charts/OutlookPaths';
import GenerationMix from '@/components/charts/GenerationMix';
import ImpactSpread from '@/components/charts/ImpactSpread';
import Consequences from '@/components/charts/Consequences';

export const metadata = {
  title: 'Trying to Make Sense of Southeast Asia’s Energy Outlooks',
  description:
    'Five serious energy outlooks for Southeast Asia broadly agree on how much energy the region will use by 2050, and disagree widely on what will supply it.',
};

const A = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener">
    {children}
  </a>
);

const BASE_CASES = [
  ['IEA 2026, Stated Policies', 'Policies in place, or announced with concrete plans', '3.3% a year (PPP)', '0.4% a year', 'Simulation built up from end uses; power mix simulated in the same model', 'Ten ASEAN members and Timor-Leste; 2024'],
  ['ACE 9th, AMS Targets', 'Members’ national targets are met', '4.2% a year (PPP, with Indonesia at market rates)', '0.3% a year', 'Accounting model with econometric drivers; power follows committed and planned projects, with rule-based dispatch', 'Ten members; 2024'],
  ['ERIA 2025, Business as usual', 'Each country’s current goals and policies', '4.7% a year (market rates)', '0.6% a year', 'National accounting models built by member teams, who also set the power mix', 'Ten members; 2021'],
  ['APERC 9th, Reference', 'Historical trends continue within technical limits', 'Not given for the region (by economy in Volume 2)', 'Not given for the region (by economy in Volume 2)', 'Economy models for demand; power modelled in OSeMOSYS, a least-cost optimisation tool', 'Seven APEC members (not Cambodia, Laos or Myanmar); 2022'],
  ['DNV 2026', 'One best-estimate forecast, discounting untested pledges', '2.5% a year (PPP)', '0.4% a year', 'System-dynamics simulation in which technologies compete on cost', 'Adds Papua New Guinea and the Pacific islands; 2025'],
];

const INPUTS = [
  {
    name: 'ERIA 2025', href: 'https://www.eria.org/uploads/Energy-Outlook-and-Energy-Saving-Potential-in-East-Asia-2025.pdf/', rest: ', Business as usual',
    cells: ['By country, supplied by each member’s team (Table 1.1 and country chapters), in constant 2015 USD', 'Yes: Table 1.4, oil USD 41 to 100 a barrel, gas USD 7.8 to 7.5 per MMBtu, coal USD 80 to 98 a tonne (2021 to 2060)', 'Yes: power plant capital costs by technology (Table 1.5) and capacity factors (Table 1.6)', 'None assumed', 'Each country’s current goals and plans; members set the power fuel mix', 'Accounting model (LEAP) with econometric demand; no equations or calibration published', 'Complete on prices and costs'],
  },
  {
    name: 'IEA 2026', href: 'https://iea.blob.core.windows.net/assets/53fc06e1-c4c8-45b4-8413-24331b73a8de/SoutheastAsiaEnergyOutlook2026.pdf', rest: ', Stated Policies',
    cells: ['Regional only: GDP 3.5% a year and population 0.4% a year to 2050, the same in every scenario', 'Not in the report', 'Not quantified', 'None modelled; current policies such as Singapore’s carbon tax are described', 'Annex B lists selected policies by country and scenario; national power plans cited but not shown as inputs', 'Points to the Global Energy and Climate Model documentation', 'Clear on policies and demand drivers; prices and costs not given'],
  },
  {
    name: 'APERC 9th', href: 'https://aperc.or.jp/file/2025/12/1/APEC_Outlook_9th_Edition-Volume_1.pdf', rest: ', Reference',
    cells: ['Sources stated (IMF to 2027, then APERC’s own growth model; UN population projections), in 2017 USD PPP; values by economy only in Volume 2', 'Not stated', 'Sources named (CSIRO GenCost, IRENA, NREL) without values', 'None stated', 'Continuation of historical trends; a few plan details, such as Indonesian nuclear from 2035', 'Annex names OSeMOSYS for power and links APERC’s models on GitHub; latest methodology report is the 8th edition’s', 'Sources clear, values mostly not'],
  },
  {
    name: 'DNV 2026', href: 'https://www.dnv.com/energy-transition-outlook/download/', rest: '',
    cells: ['Regional GDP (2017 PPP) and population published; sources not named', 'Not published; prices are an output of the model', 'Regional unit investment costs in the data download; learning rates not published', 'Yes: about USD 12 a tonne in 2030, rising to about USD 27 by 2050 (data workbook, Southeast Asia)', 'Policies modelled as taxes, subsidies, mandates and bans; no list of which', 'Main report explains the approach; charts and data sent after a download form; no separate model documentation', 'Partial'],
  },
  {
    name: 'ACE 9th', href: 'https://aseanenergy.org/publications/the-9th-asean-energy-outlook', rest: ', AMS Targets',
    cells: ['By member (Appendix D, Table D4): World Bank history to 2024, then ACE’s GDP projection and the UN population projection; 2021 USD PPP, with Indonesia at market rates; the same in every scenario', 'Yes (Appendix D10): crude import price USD 67 a barrel in 2024, 89 in 2026–27, 109 in 2050 and 120 in 2060 (2020 USD), about USD 20 above the IEA’s Current Policies path from 2035; gas production costs USD 4.0 to 6.5 per GJ, pipeline imports USD 9 to 21', 'Yes (Appendix D9): Indonesia’s technology catalogue in 2022 USD, Danish catalogues for storage, NREL’s ATB for concentrated solar; capital annualised at 7%', 'None among the scenario levers (Table D3)', 'Table D3 lists each AMS Targets lever and its basis (a national instrument or a member consultation); power capacity follows committed and planned projects, with rule-based dispatch', 'Appendix D documents boundaries, inputs, calibration and sources, with a provenance label on each input; parameter tables by member are in a supplement', 'Most complete'],
  },
  {
    name: 'IRENA/ACE 2022', href: 'https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2022/Sep/IRENA_Renewable_energy_outlook_ASEAN_2022.pdf', rest: ', Planned Energy (outside the range)',
    cells: ['Yes: Table 3, population and GDP (2015 USD), from government studies', 'Not stated', 'Partial: 2021 solar and battery costs and capital costs by country, but no input cost table', 'None stated', 'Policies in place in 2022; Viet Nam’s PDP8 and Thailand’s AEDP named', 'REmap, PLEXOS and FlexTool described (Box 1)', 'Partial'],
  },
];

export default function Article() {
  return (
    <>
      <div className="band-navy">
        <header className="container article-head">
          <h1>Trying to Make Sense of Southeast Asia’s Energy Outlooks</h1>
          <p>Raj Sawhney. November 2026</p>
        </header>
      </div>

      <div className="band-white">
        <article className="container article">
          <div className="prose">
            <p>Southeast Asia is growing fast. In 2025, the region saw:</p>
            <ul>
              <li>
                Economic growth of{' '}
                <A href="https://asean.org/wp-content/uploads/2026/08/AEIB-No.19_July-2026.pdf">nearly 5%</A>
              </li>
              <li>
                Population growth of{' '}
                <A href="https://www.worldometers.info/world-population/south-eastern-asia-population/">0.7%</A>,
                reaching roughly 700 million people
              </li>
              <li>
                Energy investment of{' '}
                <A href="https://www.iea.org/reports/southeast-asia-energy-outlook-2026/energy-in-southeast-asia">
                  more than USD 100 billion
                </A>
                , up 30% since the IEA’s 2024 outlook
              </li>
              <li>
                Energy demand{' '}
                <A href="https://www.iea.org/reports/southeast-asia-energy-outlook-2026/energy-in-southeast-asia">
                  about 40% above its 2015 level
                </A>
              </li>
            </ul>
            <p>
              Clearly, across the region, trend lines are pointing up. Yet, underlying this growth, is access to
              reliable, affordable energy. The five members where household power costs under{' '}
              <A href="https://seasiastats.com/statistic/prices-of-electricity-in-southeast-asia-e9igR">
                USD 0.10 per kWh
              </A>{' '}
              (Indonesia, Lao PDR, Malaysia, Myanmar and Viet Nam) grew their combined economies by{' '}
              <A href="https://astnet.asean.org/wp-content/uploads/2024/01/ASYB-2023.pdf">
                4.3% a year over 2015–2022
              </A>
              , against 3.0% for the four paying more than USD 0.12 (Cambodia, the Philippines, Singapore and
              Thailand). Of course, cheap power is only one of many things behind growth.
            </p>
            <p>
              Evaluating how energy demand, generation, and imports might change is critical to understanding how the
              region might grow, what bottlenecks might exist, and where opportunities lie.
            </p>
            <p>
              Luckily, there are five! different, serious energy outlooks for Southeast Asia as a region. The
              International Energy Agency (IEA), the ASEAN Centre for Energy (ACE), the Economic Research Institute
              for ASEAN and East Asia (ERIA), the Asia Pacific Energy Research Centre (APERC) and DNV each have their
              own forecasts/scenarios/outlooks.
            </p>
            <p>
              Less luckily, however, is that these forecasts differ quite dramatically across key output metrics like
              final energy, electricity generation growth, energy intensity of GDP and more.
            </p>
          </div>

          <OutlookPaths caption="Source: harmonised data from the five comparable base cases and the IEA’s Announced Pledges Scenario, 2025–2050, indexed to 2025." />

          <div className="prose">
            <p>
              For example, 2040 forecasts for final energy range between 30.1 EJ (IEA) and 40.5 EJ (ACE, our
              estimate), a multiple of 1.35, while electricity generation ranges between 2,648 TWh (ERIA) and 3,886
              TWh (ACE), a multiple of 1.47, mostly because ACE already starts about 30% higher in 2025.
            </p>
            <p>Across all five forecasts:</p>
            <ul>
              <li>Electricity grows faster than final energy, reaching 2.3 to 3.7 times its 2025 level by 2050.</li>
              <li>Gas demand rises, to 1.3 to 3.3 times its 2025 level.</li>
              <li>
                Gas-fired plants keep being built: at least 5.8 GW a year to 2035 and 8.7 GW a year after that, on our
                estimate, for the IEA, ACE, APERC and DNV outlooks.
              </li>
              <li>
                In the two outlooks that publish gas production (DNV and APERC), net gas imports grow to the
                equivalent of between 63 and 210 million tonnes of LNG/year by 2050, on our estimate.
              </li>
            </ul>
            <p>
              Seeing this, the first follow-up questions are clearly: Are these forecasts meant to be compared? Are
              they meant to answer the same question?
            </p>

            <h2>So, are these forecasts answering the same question?</h2>
            <p>
              Kind of. The IEA, ACE, and ERIA generally describe their results as scenarios reflecting each Southeast
              Asian country’s current goals, plans, and policies. APERC projects past trends, describing its reference
              scenario as “a projection based on historical trends and APERC’s assumptions about the continuation of
              those trends.” DNV describes their forecast as “an independent, ‘most likely’ forecast of the world’s
              energy future”.
            </p>
            <p>
              The table below compares the five base cases across key inputs and modeling assumptions. Many of the
              differences here are opaque, and difficult to directly compare. Even worse, each outlook uses different
              sets of models: ACE and ERIA build on LEAP, APERC uses OSeMOSYS for power, and the IEA and DNV run
              their own in-house models.
            </p>
          </div>

          <div className="table-scroll">
            <table className="plain">
              <thead>
                <tr>
                  <th>Outlook and base case</th>
                  <th>What it assumes</th>
                  <th>GDP growth, 2030–2050</th>
                  <th>Population growth, 2030–2050</th>
                  <th>How demand and the power mix are modelled</th>
                  <th>Region; base year</th>
                </tr>
              </thead>
              <tbody>
                {BASE_CASES.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) => (
                      <td key={i}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose">
            <p>
              None of the five outlooks can be rerun from the publicly available data and code. APERC does share some
              of its model code on GitHub, but I couldn’t find enough there to reproduce its results. Model files and
              calibration data, such as the existing plant fleet and transmission network, are generally not released.
              Disclosure of other inputs varies widely. ACE and ERIA document most of their inputs, whereas DNV
              publishes only some of its inputs and keeps its model proprietary. This makes it extremely difficult to
              tease out what the differences across scenarios actually mean and represent!
            </p>

            <h3>Similar demand, very different futures</h3>
            <p>
              Most outlooks provide us with enough data to compare electricity generation shares through 2050. In the
              four outlooks that split their power mix, coal and oil shares fall through 2050, while gas and
              renewables fill the gap. The biggest difference is that ACE, ERIA and APERC expect gas to grow the most,
              while the IEA and DNV expect solar and wind to grow the most.
            </p>
          </div>

          <GenerationMix caption="Source: each outlook’s own 2050 generation tables (ERIA Annex 2 ASEAN table; ACE Appendix C, gas and total only). 2024 from IEA Annex A." />

          <div className="prose">
            <p>
              It’s relatively surprising that there are such broad differences across scenarios, especially those that
              are meant to portray a “stated policies” scenario, like the IEA or ACE outlooks. The ACE outlook expects
              roughly 50% of power generation to come from gas in 2050, compared to the IEA’s 21%. Of course,
              underlying these differences are variations in technology cost assumptions, modeling conventions, and
              policy interpretations. But, without being able to investigate all of these inputs, it’s difficult to
              explain the differences across model outcomes!
            </p>
          </div>

          <ImpactSpread caption="Source: each outlook’s own data, harmonised. 2050 against 2025; ERIA solar, wind and coal from its Annex 2 ASEAN table." />

          <div className="prose">
            <p>
              The outlooks sort of agree on how much energy Southeast Asia will need. By 2050, final energy demand
              grows to between 1.5 and 2.5 times its 2025 level, and electricity generation to between 2.3 and 3.7
              times. However, technology shares of power generation range wildly. For example, DNV expects gas-fired
              generation to grow about 1.5 times by 2050, while ACE expects it to grow more than 5 times. Coal is all
              over the place as well: DNV has coal power falling by more than half, while ERIA has it more than
              doubling. Solar and wind vary the most, from roughly 3 times in ERIA’s outlook to almost 30 times in
              DNV’s.
            </p>
            <p>
              These variations have real implications, in that they paint drastically different pictures of the
              region’s future.
            </p>
          </div>

          <Consequences caption="Source: each outlook’s own data; APERC CO2 and all investment figures are our estimates. 2050; investment 2036–2050." />

          <div className="prose">
            <p>
              Looking at these results, you could realistically make all of the following, contradictory points based
              on the outlook you choose:
            </p>
            <ul>
              <li>
                If you follow DNV’s forecast, CO2 emissions fall about 10% from 2025 to 2050. But the IEA, APERC and
                ACE all expect emissions to grow, by roughly 30%, 65% and 75%, and in ERIA’s outlook they more than
                double.
              </li>
              <li>
                If you follow DNV or the IEA, gas use grows only modestly, by 30% to 45%, to around 265 to 270 bcm in
                2050. But ERIA, APERC and ACE expect it to roughly double or triple, to between 435 and 610 bcm.
              </li>
              <li>
                If you follow the IEA, power plants need about USD 56 billion of investment a year from 2036 to 2050,
                on our estimate. But DNV’s forecast needs more than twice that, about USD 132 billion a year, with
                APERC and ACE in between at USD 69 to 77 billion.
              </li>
            </ul>
            <p>
              <strong>
                Again, the problem is that we have no way to understand the difference across these scenarios. What
                drives differences in modeled CO2 estimates? Is it GDP growth rates? Carbon emissions factors?
                Technology cost curves? Policies like carbon taxes?
              </strong>
            </p>
            <p>
              To do better analysis, make better policy recommendations, and get a better sense of what it will take
              to create a secure, cheap, and clean energy future, we should be pushing to see and think about these
              models, assumptions, and data.
            </p>

            <h2>So, what to do?</h2>
            <p>
              Support and interact with folks like the{' '}
              <A href="https://www.openenergytransition.org/about-us">Open Energy Transition</A>! I’m in no way
              affiliated with them, but I believe that these are the kinds of initiatives required for us to be able
              to have sensible, clear conversations about what energy in Southeast Asia will look like.
            </p>
            <p>
              The organizations behind these outlooks could also go a long way just by publishing their input
              assumptions and model files alongside their results. Shoutout to the ACE Outlook which does by far the
              best job at providing a clear set of inputs/data. These kinds of changes would dramatically improve the
              ability of analysts to discuss big ideas and topics on a level playing field, making it easier to
              understand what works and what doesn’t, and most importantly, how we can build an affordable,
              accessible, clean energy future for Southeast Asia.
            </p>

            <h2 id="inputs">Input assumptions: what each outlook discloses</h2>
            <p>
              Only ACE and ERIA publish close to a full set. ACE’s Appendix D documents GDP and population by member,
              oil and gas prices, power technology costs and the discount rate; ERIA’s tables give fuel prices, power
              plant costs, and GDP and population for each country. The IEA, APERC and DNV state their policies or
              name their sources, but publish few of the price and cost numbers behind their results. So GDP and
              population are the only inputs that line up across the outlooks (APERC gives them only economy by
              economy), and differences in the power mix can be traced back to cost assumptions only for ACE and ERIA.
            </p>
          </div>

          <div className="table-scroll wide">
            <table className="plain">
              <thead>
                <tr>
                  <th>Outlook and base case</th>
                  <th>GDP and population</th>
                  <th>Fuel prices</th>
                  <th>Technology costs</th>
                  <th>Carbon price</th>
                  <th>Policies and power plans</th>
                  <th>Model documentation</th>
                  <th>How clear overall</th>
                </tr>
              </thead>
              <tbody>
                {INPUTS.map((r) => (
                  <tr key={r.name}>
                    <td>
                      <A href={r.href}>{r.name}</A>
                      {r.rest}
                    </td>
                    {r.cells.map((c, i) => (
                      <td key={i}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </>
  );
}
