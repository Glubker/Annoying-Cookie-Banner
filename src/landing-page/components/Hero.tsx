import openSaasBanner from '../../assets/open-saas-banner.png';
import { useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';

const GithubUrl = 'https://github.com/wasp-lang/open-saas/';
const DocsUrl = 'https://docs.opensaas.sh';

export default function Hero() {
  const [repoInfo, setRepoInfo] = useState<null | any>(null);

  useEffect(() => {
    const fetchRepoInfo = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/wasp-lang/open-saas'
        );
        const data = await response.json();
        setRepoInfo(data);
      } catch (error) {
        console.error('Error fetching repo info', error);
      }
    };
    fetchRepoInfo();
  }, []);

  return (
    <div className="relative pt-14 w-full ">
      <div
        className="absolute top-0 right-0 -z-10 transform-gpu overflow-hidden w-full blur-3xl sm:top-0 "
        aria-hidden="true"
      >
        <div
          className="aspect-[1020/880] w-[55rem] flex-none sm:right-1/4 sm:translate-x-1/2 dark:hidden bg-gradient-to-tr from-amber-400 to-purple-300 opacity-40"
          style={{
            clipPath:
              'polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)',
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-40rem)] sm:top-[calc(100%-65rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative aspect-[1020/880] sm:-left-3/4 sm:translate-x-1/4 dark:hidden bg-gradient-to-br from-amber-400 to-purple-300  opacity-50 w-[72.1875rem]"
          style={{
            clipPath: 'ellipse(80% 30% at 80% 50%)',
          }}
        />
      </div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-8">
          <div className="lg:mb-18 mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl dark:text-white tracking-tight">
              The <span className="italic">free</span> SaaS template with
              superpowers
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              An open-source, feature-rich, full-stack React + NodeJS template
              that manages features for you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={DocsUrl}
                target="_blank"
                className="rounded-md px-6 py-4 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-200 hover:ring-2 hover:ring-yellow-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white"
              >
                Get Started <span aria-hidden="true">→</span>
              </a>
              <a
                href={GithubUrl}
                target="_blank"
                className="group relative flex items-center justify-center rounded-md bg-gray-100 px-6 py-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-200 dark:bg-gray-700 hover:ring-2 hover:ring-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {/* <AiFillGithub size='1.25rem' className='mr-2' /> */}
                View the Repo
                {repoInfo!! && (
                  <>
                    <span className="absolute -top-3 -right-7 inline-flex items-center gap-x-1 rounded-full ring-1 group-hover:ring-2 ring-inset ring-yellow-300 bg-yellow-100 px-2 py-1 text-sm font-medium text-yellow-800">
                      <AiFillGithub size="1rem" />
                      {repoInfo.stargazers_count}
                    </span>
                  </>
                )}
              </a>
            </div>
          </div>
          <div className="mt-14 flow-root sm:mt-14 ">
            <div className="-m-2 rounded-xl  lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src={openSaasBanner}
                alt="App screenshot"
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
