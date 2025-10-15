'use client'

import { H1, H2, H3 } from 'components'
import Image from 'next/image'
import Layout from 'components/Layout'
import Image1 from '@/public/ai.jpg'
import Image2 from '@/public/ai2.jpg'
import Image3 from '@/public/ai3.jpg'

export const Twinspire = () => (
  <Layout
    id="platform"
    className="flex flex-col items-center justify-center pt-0"
  >
    <div className="flex w-full justify-center bg-white text-center">
      <H1 color="black">TWINSPIRE</H1>
    </div>
    <div className="relative flex w-full flex-col">
      {/* First section - What is Twinspire */}
      <div className="mt-0 flex flex-row flex-wrap items-center gap-10 py-20">
        {/* Left: Text */}
        <div className="max-w-xl flex-1">
          <H3 className="text-gray-600">WHAT IS TWINSPIRE?</H3>
          <H2 className="mb-2">Twinspire</H2>

          <p className="mt-4">
            <strong className="mt-6 text-gray-900">
              Twinspire builds a living digital model of every athlete and
              patient —a real-time mirror of the body in motion
            </strong>
            <br />
            <br />
            By translating complex biosignals into intuitive metrics on{' '}
            <strong>movement, </strong> <strong>muscle activity,</strong> and{' '}
            <strong>fatigue,</strong> our platform gives physiotherapists,
            coaches, and medical staff a unified, objective view of performance
            and recovery.
            <br />
            <br />
            With Twinspire, you can
            <strong>track every repetition, detect asymmetries</strong>{' '}
            <strong>early,</strong> and{' '}
            <strong>adjust workloads confidently</strong> — preventing injury
            before it happens and optimizing every step of rehabilitation.
          </p>
        </div>

        {/* Right: Image */}
        <div className="flex flex-1 justify-center">
          <div className="sticky top-[160px] flex h-[340px] w-[340px] items-center justify-center">
            <div className="absolute h-[340px] w-[340px] rounded-xl bg-gradient-to-r from-purple-200 to-blue-200" />
            <Image
              src={Image1}
              alt="What is Twinspire"
              width={340}
              height={340}
              className="absolute top-8 left-8 h-full w-full rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Second section - Predictive Injury Prevention */}
      <div className="mt-5 flex flex-row flex-wrap items-center gap-10 py-20">
        {/* Left: Text */}
        <div className="max-w-xl flex-1">
          <H3 className="text-gray-600">WHY IT&apos;S THE FUTURE</H3>
          <H2 className="mb-2">Predictive Injury Prevention</H2>
          <p className="mt-6">
            Twinspire continuously learns from{' '}
            <strong>wearables, EMG, motion sensors, and training logs</strong>{' '}
            to deliver <strong>personalized</strong> injury prevention and
            recovery.
            <br />
            <br />
            Our AI detects{' '}
            <strong>
              early risk indicators, compensation patterns, and performance
              imbalances
            </strong>{' '}
            long before they become injuries — offering{' '}
            <strong>evidence-based recommendations</strong> that keep athletes
            performing at their best and teams match-ready all season.
            <br />
            <br />
            In collaboration with{' '}
            <strong>leading research clinics and universities</strong>,
            we&apos;re transforming human performance science into actionable
            insights that empower physiotherapists, coaches, and athletes alike.
          </p>
        </div>

        {/* Right: Image */}
        <div className="flex flex-1 justify-center">
          <div className="sticky top-[160px] flex h-[340px] w-[340px] items-center justify-center">
            <div className="absolute h-[340px] w-[340px] rounded-xl bg-gradient-to-r from-purple-200 to-blue-200" />
            <Image
              src={Image2}
              alt="Predictive Injury Prevention"
              width={340}
              height={340}
              className="absolute top-8 left-8 h-full w-full rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Third section - The Twinspire Platform in Action */}
      <div className="mt-5 flex flex-row flex-wrap items-center gap-10 py-20">
        {/* Left: Text */}
        <div className="max-w-xl flex-1">
          <H3 className="text-gray-600">HOW WE USE IT AT TNS</H3>
          <H2 className="mb-2">The Twinspire Platform in Action</H2>
          <p className="mt-6">
            Delivered as a <strong>secure, GDPR-compliant SaaS solution</strong>
            , Twinspire unites data, analysis, and user experience in one
            intelligent platform.
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-6">
            <li>
              <strong>Managers</strong> monitor workloads and recovery timelines
              in real time.
            </li>
            <li>
              <strong>Physiotherapists</strong> track objective rehab progress
              through digital twins.
            </li>
            <li>
              <strong>Athletes</strong> receive instant, gamified feedback on
              performance and readiness.
            </li>
          </ul>
          <p className="mt-6">
            Our adaptive AI refines itself with every data point — making{' '}
            <strong>
              each user smarter, each session safer, and each recovery faster.
            </strong>
          </p>
        </div>

        {/* Right: Image */}
        <div className="flex flex-1 justify-center">
          <div className="sticky top-[160px] flex h-[340px] w-[340px] items-center justify-center">
            <div className="absolute h-[340px] w-[340px] rounded-xl bg-gradient-to-r from-purple-200 to-blue-200" />
            <Image
              src={Image3}
              alt="The Twinspire Platform in Action"
              width={340}
              height={340}
              className="absolute top-8 left-8 h-full w-full rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
)
