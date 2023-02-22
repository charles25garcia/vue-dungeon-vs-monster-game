<template>
     <table>
      <tbody>
        <tr>
          <th>
            <font-awesome-icon icon="heartbeat" color="#5f2222" />
          </th>
          <td>Health</td>
          <td>
            {{ stats.health }}
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="hand-holding-water" color="#064467" />
          </th>
          <td>Mana</td>
          <td>
            {{ stats.mana }}
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="hand-rock" color="#634c1c" />
          </th>
          <td>Offense</td>
          <td>
            {{ stats.off }}
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="shield-alt" color="#585a5a" />
          </th>
          <td>Deffense</td>
          <td>
            {{ stats.def }}
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="running" color="#2a6c45" />
          </th>
          <td>Agility</td>
          <td>
            {{ stats.agi }}
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="head-side-virus" color="#66c7d7" />
          </th>
          <td>Intelligence</td>
          <td>
            {{ stats.int }}
          </td>
        </tr>
        <tr>
          <th>
            <font-awesome-icon icon="user-shield" color="#939752" />
          </th>
          <td>Luck</td>
          <td>
            {{ stats.luk }}
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>

export default {
    props: ['stats']
}
</script>
